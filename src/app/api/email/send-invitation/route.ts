import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { getInvitationEmailTemplate } from '@/lib/email-templates';
import { requireAdminAuth } from '@/lib/api-security';

// Endpoint para enviar manualmente e-mail de convite especial
// Requer: Authorization: Bearer <ADMIN_API_SECRET>
export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { email, nome, tipo = 'MENTORADO' } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'email é obrigatório' },
        { status: 400 }
      );
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    if (tipo !== 'MENTORADO' && tipo !== 'CONVIDADO') {
      return NextResponse.json(
        { success: false, error: 'Tipo deve ser MENTORADO ou CONVIDADO' },
        { status: 400 }
      );
    }

    const customerName = nome || email.split('@')[0];
    const html = getInvitationEmailTemplate({ nome: customerName, email }, tipo);
    const subject = '🎁 Convite Especial - Workshop Destrava Ligações';

    const result = await sendEmail({
      to: email,
      subject,
      html,
    });

    if (result.success) {
      console.log(`Email de convite enviado manualmente para ${email}`);
      return NextResponse.json({
        success: true,
        message: `Email de convite enviado com sucesso para ${email}`,
        messageId: result.messageId,
        tipo,
      });
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: result.error || 'Erro ao enviar email' 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro ao enviar email de convite:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erro ao enviar email' 
      },
      { status: 500 }
    );
  }
}
















