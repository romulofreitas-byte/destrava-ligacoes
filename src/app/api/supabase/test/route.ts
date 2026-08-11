import { NextRequest, NextResponse } from 'next/server';
import { testSupabaseConnection } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/api-security';

/**
 * Endpoint para testar a conexão com o Supabase
 * Requer: Authorization: Bearer <ADMIN_API_SECRET>
 */
export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const result = await testSupabaseConnection();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Conexão com Supabase funcionando corretamente',
        details: result.details,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: result.error,
        details: result.details,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Erro inesperado ao testar conexão',
        message: error.message || 'Erro desconhecido',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const result = await testSupabaseConnection();

    return NextResponse.json(
      {
        success: result.success,
        message: result.success
          ? 'Teste completo realizado com sucesso'
          : 'Teste falhou',
        error: result.error,
        details: result.details,
        timestamp: new Date().toISOString(),
      },
      { status: result.success ? 200 : 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Erro inesperado ao executar teste',
        message: error.message || 'Erro desconhecido',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
