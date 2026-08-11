import { NextRequest, NextResponse } from 'next/server';
import { 
  getPixChargeStatus, 
  validateWebhookSignature, 
  extractCustomerFromWebhook,
  type EfipixWebhookNotification 
} from '@/lib/efi';
import { sendImmediateEmail } from '@/lib/email-cadence';
import { upsertWorkshopRegistration, updateEmailStatus, getWorkshopRegistration } from '@/lib/supabase';

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

    const rawBody = await request.text();
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
    }

    console.log('📦 Body recebido:', JSON.stringify(body, null, 2));

    const signature =
      request.headers.get('x-efi-signature') ||
      request.headers.get('signature');

    if (!validateWebhookSignature(body, signature || undefined, rawBody)) {
      console.warn('⚠️ Webhook Efí rejeitado: assinatura inválida ou secret ausente');
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
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

        // Buscar registro no Supabase pelo txid ou endToEndId
        // O txid é o identificador da cobrança, que deve estar salvo no Supabase
        let registration = null;
        
        // Tentar buscar pelo txid como charge_id
        const supabaseResult = await getWorkshopRegistration(txid);
        if (supabaseResult.success && supabaseResult.data) {
          registration = supabaseResult.data;
          console.log('✅ Registro encontrado no Supabase pelo txid:', txid);
        }

        // Se não encontrou, tentar buscar pelo endToEndId
        if (!registration && endToEndId) {
          // Nota: Pode ser necessário criar uma função específica para buscar por endToEndId
          // Por enquanto, vamos usar o txid
          console.log('ℹ️ Tentando buscar por endToEndId:', endToEndId);
        }

        // Extrair dados do cliente
        let customerEmail: string | undefined;
        let customerName: string | undefined;

        // Prioridade 1: Dados do Supabase (se encontrado)
        if (registration) {
          customerEmail = registration.email;
          customerName = registration.nome;
          console.log('📧 Dados do cliente do Supabase:', {
            email: customerEmail,
            nome: customerName,
          });
        }

        // Prioridade 2: Dados da cobrança (devedor)
        if (!customerEmail && chargeData) {
          // Nome do devedor
          if (chargeData.devedor?.nome) {
            customerName = chargeData.devedor.nome;
          }
          
          console.log('📧 Dados do cliente da cobrança:', {
            email: customerEmail,
            nome: customerName,
          });
        }

        // Prioridade 3: infoPagador do PIX (se disponível)
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

        console.log('💾 Salvando/atualizando registro no Supabase:', {
          txid,
          email: customerEmail,
          status: registrationData.status,
        });

        const upsertResult = await upsertWorkshopRegistration(registrationData);
        
        if (upsertResult.success) {
          console.log('✅ Registro atualizado no Supabase com sucesso');
        } else {
          console.error('⚠️ Erro ao salvar no Supabase (não crítico - fluxo continua):', {
            error: upsertResult.error,
          });
        }

        // Se pagamento está confirmado e temos email, enviar e-mail de confirmação
        if (chargeData?.status === 'CONCLUIDA' && customerEmail) {
          console.log('✅ Pagamento confirmado, enviando e-mail:', {
            txid,
            email: customerEmail,
            nome: customerName,
          });

          // Tentar enviar e-mail com retry
          let emailSent = false;
          let lastError: string | undefined;

          for (let attempt = 1; attempt <= 3; attempt++) {
            try {
              console.log(`📧 Tentativa ${attempt}/3 de envio de e-mail...`);
              
              const emailResult = await sendImmediateEmail({
                email: customerEmail,
                nome: customerName || 'Participante',
                chargeId: txid,
                referenceId: endToEndId || txid,
              });

              if (emailResult.success) {
                console.log('✅ ===== EMAIL ENVIADO COM SUCESSO =====');
                console.log('✅ Destinatário:', customerEmail);
                console.log('✅ Message ID:', emailResult.messageId || 'N/A');
                console.log('✅ TXID:', txid);
                
                // Atualizar status de email no Supabase
                try {
                  await updateEmailStatus(txid, true);
                  console.log('✅ Status de email atualizado no Supabase');
                } catch (emailStatusError: any) {
                  console.error('⚠️ Erro ao atualizar status de email no Supabase (não crítico):', emailStatusError);
                }
                
                emailSent = true;
                break; // Sair do loop de retry
              } else {
                lastError = emailResult.error;
                console.error(`❌ Tentativa ${attempt} falhou:`, emailResult.error);
                
                // Aguardar antes da próxima tentativa (5s, 10s, 15s)
                if (attempt < 3) {
                  const delay = attempt * 5000;
                  console.log(`⏳ Aguardando ${delay}ms antes da próxima tentativa...`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                }
              }
            } catch (emailError: any) {
              lastError = emailError.message;
              console.error(`❌ Exceção na tentativa ${attempt}:`, emailError.message);
              
              if (attempt < 3) {
                const delay = attempt * 5000;
                await new Promise(resolve => setTimeout(resolve, delay));
              }
            }
          }

          if (!emailSent) {
            console.error('❌ ===== FALHA AO ENVIAR EMAIL APÓS 3 TENTATIVAS =====');
            console.error('❌ Destinatário:', customerEmail);
            console.error('❌ Último erro:', lastError);
            console.error('❌ TXID:', txid);
            console.error('⚠️ O e-mail será tentado novamente via fallback ou polling');
          }
        } else if (!customerEmail) {
          console.warn('⚠️ ATENÇÃO: Email do cliente não encontrado');
          console.warn('Dados disponíveis:', {
            txid,
            endToEndId,
            has_charge_data: !!chargeData,
            has_registration: !!registration,
          });
          console.warn('⚠️ O email de confirmação NÃO será enviado automaticamente.');
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
          emailSent: chargeData?.status === 'CONCLUIDA' && customerEmail ? true : false,
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


