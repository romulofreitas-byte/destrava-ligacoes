import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: NextRequest) {
  console.log('🏥 [HEALTH] Health check iniciado');
  
  const healthStatus = {
    timestamp: new Date().toISOString(),
    checks: {
      resendApiKey: false,
      resendConnection: false,
      fromEmail: false,
    },
    details: {} as Record<string, any>,
    overall: 'unhealthy' as 'healthy' | 'unhealthy' | 'degraded',
  };

  // 1. Verificar se RESEND_API_KEY está configurada
  if (process.env.RESEND_API_KEY) {
    healthStatus.checks.resendApiKey = true;
    healthStatus.details.resendApiKey = 'Configurada';
    console.log('✅ [HEALTH] RESEND_API_KEY está configurada');
  } else {
    healthStatus.details.resendApiKey = 'NÃO CONFIGURADA - Configure no Vercel';
    console.error('❌ [HEALTH] RESEND_API_KEY não está configurada');
  }

  // 2. Verificar FROM_EMAIL
  const fromEmail = process.env.FROM_EMAIL || 'noreply@pitstop.mundopodium.com.br';
  healthStatus.checks.fromEmail = true;
  healthStatus.details.fromEmail = fromEmail;
  console.log('✅ [HEALTH] FROM_EMAIL:', fromEmail);

  // 3. Testar conexão com Resend (apenas se API key estiver configurada)
  if (healthStatus.checks.resendApiKey) {
    try {
      console.log('🔍 [HEALTH] Testando conexão com Resend...');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      // Tentar listar domínios como teste de conexão
      // Nota: isso pode falhar se a API key não tiver permissões, mas pelo menos testa a conexão
      try {
        await resend.domains.list();
        healthStatus.checks.resendConnection = true;
        healthStatus.details.resendConnection = 'Conexão OK';
        console.log('✅ [HEALTH] Conexão com Resend OK');
      } catch (apiError: any) {
        // Se der erro de permissão, ainda consideramos que a conexão está OK
        if (apiError.message?.includes('permission') || apiError.statusCode === 403) {
          healthStatus.checks.resendConnection = true;
          healthStatus.details.resendConnection = 'Conexão OK (sem permissão para listar domínios)';
          console.log('✅ [HEALTH] Conexão com Resend OK (API key válida mas sem todas as permissões)');
        } else {
          healthStatus.details.resendConnection = `Erro: ${apiError.message}`;
          console.error('❌ [HEALTH] Erro ao conectar com Resend:', apiError.message);
        }
      }
    } catch (error: any) {
      healthStatus.details.resendConnection = `Erro: ${error.message}`;
      console.error('❌ [HEALTH] Erro ao testar Resend:', error.message);
    }
  } else {
    healthStatus.details.resendConnection = 'Não testado (API key não configurada)';
  }

  // 4. Verificar outras variáveis relevantes
  healthStatus.details.otherEnvVars = {
    PAGBANK_TOKEN: !!process.env.PAGBANK_TOKEN ? 'Configurado' : 'NÃO configurado',
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Configurado' : 'NÃO configurado',
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configurado' : 'NÃO configurado',
  };

  // Determinar status geral
  if (healthStatus.checks.resendApiKey && healthStatus.checks.resendConnection) {
    healthStatus.overall = 'healthy';
  } else if (healthStatus.checks.resendApiKey) {
    healthStatus.overall = 'degraded';
  } else {
    healthStatus.overall = 'unhealthy';
  }

  console.log('🏥 [HEALTH] Status geral:', healthStatus.overall);

  // Retornar status HTTP apropriado
  const statusCode = healthStatus.overall === 'healthy' ? 200 : 
                     healthStatus.overall === 'degraded' ? 207 : 503;

  return NextResponse.json(healthStatus, { status: statusCode });
}

// Endpoint POST para enviar email de teste
export async function POST(request: NextRequest) {
  console.log('📧 [HEALTH] Teste de envio de email iniciado');
  
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório no body: { "email": "seu@email.com" }' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY não configurada' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.FROM_EMAIL || 'noreply@pitstop.mundopodium.com.br';
    const fromWithName = `Rômulo, Pódium <${fromEmail}>`;

    console.log('📧 [HEALTH] Enviando email de teste para:', email);

    const { data, error } = await resend.emails.send({
      from: fromWithName,
      to: [email],
      subject: '✅ Teste de Email - Sistema de Confirmação',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981;">✅ Email de Teste</h1>
          <p>Este é um email de teste do sistema de confirmação do Workshop Destrave Suas Ligações.</p>
          <p>Se você recebeu este email, significa que:</p>
          <ul>
            <li>✅ A API key do Resend está configurada corretamente</li>
            <li>✅ O domínio está verificado</li>
            <li>✅ O sistema de envio de emails está funcionando</li>
          </ul>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Enviado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ [HEALTH] Erro ao enviar email de teste:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          details: error,
        },
        { status: 500 }
      );
    }

    console.log('✅ [HEALTH] Email de teste enviado com sucesso');
    console.log('✅ [HEALTH] Message ID:', data?.id);

    return NextResponse.json({
      success: true,
      message: 'Email de teste enviado com sucesso',
      messageId: data?.id,
      sentTo: email,
      sentAt: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('❌ [HEALTH] Exceção ao enviar email de teste:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Erro ao enviar email de teste',
      },
      { status: 500 }
    );
  }
}



