import { NextRequest, NextResponse } from 'next/server';
import { checkAndSendScheduledEmails } from '@/lib/email-cadence';
import { requireCronAuth } from '@/lib/api-security';

// Endpoint para verificar e enviar emails agendados
// Requer: Authorization: Bearer <EMAIL_CRON_SECRET|CRON_SECRET|ADMIN_API_SECRET>
export async function POST(request: NextRequest) {
  const authError = requireCronAuth(request);
  if (authError) return authError;

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

export async function GET(request: NextRequest) {
  const authError = requireCronAuth(request);
  if (authError) return authError;

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
