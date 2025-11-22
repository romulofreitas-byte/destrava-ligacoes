import { NextRequest, NextResponse } from 'next/server';
import { checkAndSendScheduledEmails } from '@/lib/email-cadence';

// Endpoint para verificar e enviar emails agendados
// Pode ser chamado por um cron job ou agendador
export async function POST(request: NextRequest) {
  try {
    // Verificar se há uma chave de autenticação (opcional, mas recomendado)
    // Vercel Cron não envia headers customizados, então a autenticação é opcional
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.EMAIL_CRON_SECRET;
    
    // Se EMAIL_CRON_SECRET estiver configurado, exigir autenticação
    // Caso contrário, permitir acesso (útil para Vercel Cron que não envia headers)
    if (expectedToken) {
      if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
        return NextResponse.json(
          { error: 'Não autorizado' },
          { status: 401 }
        );
      }
    }

    await checkAndSendScheduledEmails();

    return NextResponse.json({
      success: true,
      message: 'Verificação de emails agendados concluída',
    });
  } catch (error: any) {
    console.error('Erro ao verificar emails agendados:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao verificar emails agendados' },
      { status: 500 }
    );
  }
}

// GET para verificar manualmente (útil para testes)
export async function GET(request: NextRequest) {
  try {
    await checkAndSendScheduledEmails();

    return NextResponse.json({
      success: true,
      message: 'Verificação de emails agendados concluída',
    });
  } catch (error: any) {
    console.error('Erro ao verificar emails agendados:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao verificar emails agendados' },
      { status: 500 }
    );
  }
}

