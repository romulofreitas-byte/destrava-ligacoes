import { NextRequest, NextResponse } from 'next/server';
import { upsertWorkshopRegistration } from '@/lib/supabase';
import { sendImmediateEmail } from '@/lib/email-cadence';
import { updateEmailStatus } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/api-security';

// Requer: Authorization: Bearer <ADMIN_API_SECRET>
export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    
    // Dados do participante
    const {
      charge_id,
      reference_id,
      nome,
      email,
      telefone_country,
      telefone_area,
      telefone_number,
      status,
      amount_brl,
      payment_method,
      installments,
    } = body;

    if (!charge_id || !email || !nome) {
      return NextResponse.json(
        { error: 'charge_id, email e nome são obrigatórios' },
        { status: 400 }
      );
    }

    // 1. Atualizar/inserir no Supabase
    console.log('📝 Atualizando dados no Supabase...');
    const registrationData = {
      charge_id,
      reference_id,
      nome,
      email,
      telefone_country,
      telefone_area,
      telefone_number,
      status: status || 'PAID',
      amount_brl: amount_brl ? parseFloat(amount_brl.toString()) : undefined,
      payment_method,
      installments: installments ? parseInt(installments.toString()) : undefined,
      paid_at: status === 'PAID' ? new Date().toISOString() : undefined,
    };

    const supabaseResult = await upsertWorkshopRegistration(registrationData);
    
    if (!supabaseResult.success) {
      return NextResponse.json(
        { error: `Erro ao atualizar Supabase: ${supabaseResult.error}` },
        { status: 500 }
      );
    }

    console.log('✅ Dados atualizados no Supabase');

    // 2. Enviar email de confirmação
    console.log('📧 Enviando email de confirmação...');
    const emailResult = await sendImmediateEmail({
      email,
      nome,
      chargeId: charge_id,
      referenceId: reference_id || '',
    });

    if (!emailResult.success) {
      console.error('❌ Erro ao enviar email:', emailResult.error);
      return NextResponse.json(
        { 
          success: true,
          supabaseUpdated: true,
          emailSent: false,
          error: `Email não enviado: ${emailResult.error}`,
          supabaseData: supabaseResult.data,
        },
        { status: 200 } // Retorna 200 porque Supabase foi atualizado
      );
    }

    // 3. Atualizar status de email no Supabase
    try {
      await updateEmailStatus(charge_id, true);
    } catch (emailStatusError: any) {
      console.warn('⚠️ Erro ao atualizar status de email no Supabase (não crítico):', emailStatusError);
    }

    console.log('✅ Email enviado com sucesso');

    return NextResponse.json({
      success: true,
      supabaseUpdated: true,
      emailSent: true,
      message: 'Dados atualizados e email enviado com sucesso',
      supabaseData: supabaseResult.data,
    });
  } catch (error: any) {
    console.error('❌ Erro no processo:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}









