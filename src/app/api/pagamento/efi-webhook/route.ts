import { NextRequest, NextResponse } from 'next/server';
import { 
  getPixChargeStatus, 
  validateWebhookSignature, 
  extractCustomerFromWebhook,
  type EfipixWebhookNotification 
} from '@/lib/efi';
import { upsertWDL3Registration } from '@/lib/supabase';

/**
 * Webhook do Banco Efí para receber notificações de pagamento PIX
 * 
 * O Banco Efí envia notificações quando um PIX é recebido.
 * Formato esperado: { pix: [{ endToEndId, txid, valor, chave, horario, infoPagador }] }
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🔔 ===== WEBHOOK BANCO EFÍ RECEBIDO =====');
    console.log('⏰ Timestamp:', new Date().toISOString());
    
    const body = await request.json();
    console.log('📦 Body recebido:', JSON.stringify(body, null, 2));
    
    // Validar assinatura do webhook (se configurada)
    const signature = request.headers.get('x-efi-signature') || request.headers.get('signature');
    if (!validateWebhookSignature(body, signature || undefined)) {
      console.warn('⚠️ Webhook com assinatura inválida ou formato incorreto');
      // Continuar processamento mesmo assim (validação básica passou)
    }

    // Extrair informações do webhook
    const webhookData = body as EfipixWebhookNotification;
    
    if (!webhookData.pix || webhookData.pix.length === 0) {
      console.warn('⚠️ Webhook sem dados de PIX');
      return NextResponse.json(
        { error: 'Webhook sem dados de PIX' },
        { status: 400 }
      );
    }

    // Processar cada PIX recebido
    const results = [];
    
    for (const pix of webhookData.pix) {
      const txid = pix.txid;
      const endToEndId = pix.endToEndId;
      const valor = parseFloat(pix.valor);
      
      console.log('🔍 Processando PIX:', {
        txid,
        endToEndId,
        valor,
        horario: pix.horario,
      });

      try {
        // Consultar status da cobrança para obter mais informações
        let chargeData;
        try {
          chargeData = await getPixChargeStatus(txid);
          console.log('✅ Status da cobrança obtido:', {
            txid,
            status: chargeData.status,
            solicitacaoPagador: chargeData.solicitacaoPagador,
          });
        } catch (chargeError: any) {
          console.warn('⚠️ Erro ao consultar cobrança (continuando):', chargeError.message);
          // Continuar mesmo se não conseguir consultar a cobrança
        }

        // Extrair dados do cliente
        let customerEmail: string | undefined;
        let customerName: string | undefined;

        // Prioridade 1: Dados da cobrança
        if (chargeData) {
          // Nome do devedor
          if (chargeData.devedor?.nome) {
            customerName = chargeData.devedor.nome;
          }
          
          console.log('📧 Dados do cliente da cobrança:', {
            email: customerEmail,
            nome: customerName,
          });
        }

        // Prioridade 2: infoPagador do PIX (se disponível)
        if (!customerEmail && pix.infoPagador) {
          // Tentar extrair email do infoPagador (formato pode variar)
          const emailMatch = pix.infoPagador.match(/[\w\.-]+@[\w\.-]+\.\w+/);
          if (emailMatch) {
            customerEmail = emailMatch[0];
          }
        }

        // Se ainda não tem email, usar email de teste para desenvolvimento
        if (!customerEmail && process.env.NODE_ENV === 'development') {
          customerEmail = 'romulocsfreitas@gmail.com';
          customerName = customerName || 'Teste';
          console.log('🧪 Usando email de teste (desenvolvimento):', customerEmail);
        }

        // Salvar/atualizar registro no Supabase
        const registrationData = {
          charge_id: txid, // Usar txid como charge_id
          reference_id: endToEndId || txid,
          nome: customerName,
          email: customerEmail,
          status: chargeData?.status === 'CONCLUIDA' ? 'PAID' : 'PENDING',
          amount: valor,
          amount_brl: valor,
          payment_method: 'PIX',
          description: chargeData?.solicitacaoPagador || 'Workshop Destrava Ligações',
          paid_at: chargeData?.status === 'CONCLUIDA' ? new Date().toISOString() : undefined,
        };

        console.log('💾 Salvando/atualizando registro WDL3 no Supabase:', {
          txid,
          email: customerEmail,
          status: registrationData.status,
        });

        const upsertResult = await upsertWDL3Registration(registrationData);
        
        if (upsertResult.success) {
          console.log('✅ Registro WDL3 atualizado no Supabase com sucesso');
        } else {
          console.error('⚠️ Erro ao salvar no Supabase (não crítico - fluxo continua):', {
            error: upsertResult.error,
          });
        }

        // Se pagamento está confirmado, apenas logar (emails serão enviados pela plataforma Mundo Pódium)
        if (chargeData?.status === 'CONCLUIDA') {
          console.log('✅ Pagamento confirmado e registrado no Supabase:', {
            txid,
            email: customerEmail,
            nome: customerName,
          });
          console.log('ℹ️ Email de confirmação será enviado pela plataforma Mundo Pódium');
        } else if (chargeData?.status !== 'CONCLUIDA') {
          console.log('ℹ️ Pagamento ainda não confirmado:', {
            txid,
            status: chargeData?.status,
          });
        }

        results.push({
          txid,
          endToEndId,
          processed: true,
        });

      } catch (pixError: any) {
        console.error('❌ Erro ao processar PIX:', {
          txid: pix.txid,
          error: pixError.message,
        });
        results.push({
          txid: pix.txid,
          endToEndId: pix.endToEndId,
          processed: false,
          error: pixError.message,
        });
      }
    }

    return NextResponse.json({
      received: true,
      processed: results.length,
      results,
    });

  } catch (error: any) {
    console.error('❌ Erro ao processar webhook do Banco Efí:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}

// GET para verificar status (útil para testes)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const txid = searchParams.get('txid');

  if (!txid) {
    return NextResponse.json(
      { error: 'txid é obrigatório' },
      { status: 400 }
    );
  }

  try {
    const charge = await getPixChargeStatus(txid);
    return NextResponse.json({ charge });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erro ao consultar cobrança' },
      { status: 500 }
    );
  }
}


