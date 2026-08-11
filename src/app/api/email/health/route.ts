import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { requireAdminAuth } from '@/lib/api-security';

// Requer: Authorization: Bearer <ADMIN_API_SECRET>
export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  console.log('🏥 [HEALTH] Health check iniciado');

  const healthStatus = {
    timestamp: new Date().toISOString(),
    checks: {
      resendApiKey: false,
      resendConnection: false,
      fromEmail: false,
    },
    details: {} as Record<string, string>,
    overall: 'unhealthy' as 'healthy' | 'unhealthy' | 'degraded',
  };

  if (process.env.RESEND_API_KEY) {
    healthStatus.checks.resendApiKey = true;
    healthStatus.details.resendApiKey = 'Configurada';
  } else {
    healthStatus.details.resendApiKey = 'NÃO CONFIGURADA';
  }

  const fromEmail = process.env.FROM_EMAIL || 'noreply@pitstop.mundopodium.com.br';
  healthStatus.checks.fromEmail = true;
  healthStatus.details.fromEmail = fromEmail;

  if (healthStatus.checks.resendApiKey) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        await resend.domains.list();
        healthStatus.checks.resendConnection = true;
        healthStatus.details.resendConnection = 'Conexão OK';
      } catch (apiError: any) {
        if (apiError.message?.includes('permission') || apiError.statusCode === 403) {
          healthStatus.checks.resendConnection = true;
          healthStatus.details.resendConnection = 'Conexão OK';
        } else {
          healthStatus.details.resendConnection = 'Erro de conexão';
        }
      }
    } catch {
      healthStatus.details.resendConnection = 'Erro ao testar';
    }
  } else {
    healthStatus.details.resendConnection = 'Não testado';
  }

  // Booleans only — do not leak which secrets exist to unauthenticated callers
  // (this route is admin-only; still avoid raw values)
  healthStatus.details.pagbankConfigured = process.env.PAGBANK_TOKEN ? 'yes' : 'no';
  healthStatus.details.supabaseConfigured = process.env.SUPABASE_SERVICE_ROLE_KEY
    ? 'yes'
    : 'no';

  if (healthStatus.checks.resendApiKey && healthStatus.checks.resendConnection) {
    healthStatus.overall = 'healthy';
  } else if (healthStatus.checks.resendApiKey) {
    healthStatus.overall = 'degraded';
  } else {
    healthStatus.overall = 'unhealthy';
  }

  const statusCode =
    healthStatus.overall === 'healthy'
      ? 200
      : healthStatus.overall === 'degraded'
        ? 207
        : 503;

  return NextResponse.json(healthStatus, { status: statusCode });
}

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório no body: { "email": "seu@email.com" }' },
        { status: 400 }
      );
    }

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

    const { data, error } = await resend.emails.send({
      from: fromWithName,
      to: [email],
      subject: '✅ Teste de Email - Sistema de Confirmação',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981;">✅ Email de Teste</h1>
          <p>Este é um email de teste do sistema de confirmação do Workshop Destrava Ligações.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Enviado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email de teste enviado com sucesso',
      messageId: data?.id,
      sentTo: email,
      sentAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao enviar email de teste' },
      { status: 500 }
    );
  }
}
