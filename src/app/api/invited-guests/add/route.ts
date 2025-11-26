import { NextRequest, NextResponse } from 'next/server';
import { addInvitedGuest } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';
import { getInvitationEmailTemplate } from '@/lib/email-templates';

// Endpoint para adicionar convidado especial ao Supabase e enviar e-mail de convite
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, email, tipo } = body;

    // Validações
    if (!nome || !email) {
      return NextResponse.json(
        { success: false, error: 'Nome e email são obrigatórios' },
        { status: 400 }
      );
    }

    if (tipo !== 'MENTORADO' && tipo !== 'CONVIDADO') {
      return NextResponse.json(
        { success: false, error: 'Tipo deve ser MENTORADO ou CONVIDADO' },
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

    // Adicionar ao Supabase
    console.log(`📝 Adicionando convidado ao Supabase: ${nome} (${email}) - ${tipo}`);
    const supabaseResult = await addInvitedGuest(nome, email, tipo);

    if (!supabaseResult.success) {
      return NextResponse.json(
        { 
          success: false,
          error: supabaseResult.error || 'Erro ao adicionar convidado ao Supabase'
        },
        { status: 500 }
      );
    }

    // Enviar e-mail de convite
    console.log(`📧 Enviando e-mail de convite para: ${email}`);
    const html = getInvitationEmailTemplate({ nome, email }, tipo);
    const subject = '🎁 Convite Especial - Workshop Destrave Suas Ligações';

    const emailResult = await sendEmail({
      to: email,
      subject,
      html,
    });

    if (!emailResult.success) {
      console.error(`❌ Erro ao enviar e-mail para ${email}:`, emailResult.error);
      // Mesmo se o e-mail falhar, o registro foi adicionado ao Supabase
      return NextResponse.json({
        success: true,
        message: 'Convidado adicionado ao Supabase, mas e-mail não foi enviado',
        chargeId: supabaseResult.chargeId,
        emailSent: false,
        emailError: emailResult.error,
      });
    }

    // Atualizar status de e-mail enviado no Supabase
    // (opcional - pode ser feito depois via outro endpoint se necessário)

    return NextResponse.json({
      success: true,
      message: 'Convidado adicionado ao Supabase e e-mail enviado com sucesso',
      chargeId: supabaseResult.chargeId,
      emailSent: true,
      messageId: emailResult.messageId,
    });
  } catch (error: any) {
    console.error('Erro ao adicionar convidado:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Erro ao adicionar convidado'
      },
      { status: 500 }
    );
  }
}


