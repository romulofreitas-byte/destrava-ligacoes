import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { getWorkshopEmailTemplate } from '@/lib/email-templates';

// Endpoint para enviar email de teste
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, nome } = body;

    const testEmail = email || 'romulocsfreitas@gmail.com';
    const testNome = nome || 'Rômulo';

    const html = getWorkshopEmailTemplate({ 
      nome: testNome, 
      email: testEmail 
    });

    const result = await sendEmail({
      to: testEmail,
      subject: '🧪 Email de Teste - Workshop Destrave Suas Ligações',
      html,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Email de teste enviado com sucesso para ${testEmail}`,
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: result.error || 'Erro ao enviar email de teste' 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro ao enviar email de teste:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao enviar email de teste' },
      { status: 500 }
    );
  }
}

// GET para enviar email de teste rápido
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email') || 'romulocsfreitas@gmail.com';
    const nome = searchParams.get('nome') || 'Rômulo';

    const html = getWorkshopEmailTemplate({ 
      nome, 
      email 
    });

    const result = await sendEmail({
      to: email,
      subject: '🧪 Email de Teste - Workshop Destrave Suas Ligações',
      html,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Email de teste enviado com sucesso para ${email}`,
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: result.error || 'Erro ao enviar email de teste' 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro ao enviar email de teste:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao enviar email de teste' },
      { status: 500 }
    );
  }
}




