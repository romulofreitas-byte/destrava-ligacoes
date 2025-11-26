import { NextRequest, NextResponse } from 'next/server';
import { testSupabaseConnection } from '@/lib/supabase';

/**
 * Endpoint para testar a conexão com o Supabase
 * GET /api/supabase/test
 * 
 * Retorna informações sobre o status da conexão, validação da tabela,
 * e capacidade de leitura/escrita.
 * 
 * Útil para debugging e verificação de configuração.
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar se está em ambiente de desenvolvimento ou se tem token de autenticação
    const authHeader = request.headers.get('authorization');
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Em produção, requer autenticação (opcional - pode ser removido se não necessário)
    if (!isDevelopment && !authHeader) {
      return NextResponse.json(
        { 
          error: 'Não autorizado',
          message: 'Este endpoint requer autenticação em produção'
        },
        { status: 401 }
      );
    }

    const result = await testSupabaseConnection();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Conexão com Supabase funcionando corretamente',
        details: result.details,
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          details: result.details,
          timestamp: new Date().toISOString(),
          troubleshooting: {
            steps: [
              'Verifique se NEXT_PUBLIC_SUPABASE_URL está configurada corretamente',
              'Verifique se SUPABASE_SERVICE_ROLE_KEY está configurada corretamente',
              'Execute o script SQL em supabase-workshop-schema.sql no Supabase Dashboard',
              'Verifique se a tabela workshop_registrations existe no Supabase',
              'Verifique os logs do servidor para mais detalhes',
            ],
          },
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('❌ Erro ao testar conexão com Supabase:', error);
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

/**
 * POST endpoint para forçar um teste completo (incluindo escrita)
 * POST /api/supabase/test
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!isDevelopment && !authHeader) {
      return NextResponse.json(
        { 
          error: 'Não autorizado',
          message: 'Este endpoint requer autenticação em produção'
        },
        { status: 401 }
      );
    }

    const result = await testSupabaseConnection();

    // Retornar resposta mais detalhada
    return NextResponse.json({
      success: result.success,
      message: result.success 
        ? 'Teste completo realizado com sucesso' 
        : 'Teste falhou',
      error: result.error,
      details: result.details,
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        supabaseUrlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      },
    }, {
      status: result.success ? 200 : 500
    });
  } catch (error: any) {
    console.error('❌ Erro ao executar teste completo do Supabase:', error);
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




