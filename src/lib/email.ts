import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY não configurado');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

// Função auxiliar para aguardar (sleep)
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sendEmail({ to, subject, html, from }: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  console.log('📧 [EMAIL] ===== Iniciando sendEmail =====');
  console.log('📧 [EMAIL] Para:', to);
  console.log('📧 [EMAIL] Assunto:', subject);
  console.log('📧 [EMAIL] From personalizado:', from || 'não especificado');
  
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ [EMAIL] RESEND_API_KEY não configurado');
    console.error('❌ [EMAIL] Variáveis de ambiente disponíveis:', Object.keys(process.env).filter(k => k.includes('RESEND') || k.includes('FROM')));
    return { success: false, error: 'RESEND_API_KEY não configurado' };
  }

  console.log('✅ [EMAIL] RESEND_API_KEY está configurada');

  // Configuração de retry
  const MAX_RETRIES = 3;
  const RETRY_DELAYS = [1000, 3000, 5000]; // 1s, 3s, 5s
  
  let lastError: any = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`🔄 [EMAIL] Tentativa ${attempt + 1} de ${MAX_RETRIES}...`);
        await sleep(RETRY_DELAYS[attempt - 1]);
      }

      // Email remetente padrão: noreply@pitstop.mundopodium.com.br
      // Domínio verificado no Resend: pitstop.mundopodium.com.br
      // O email precisa usar o domínio/subdomínio verificado no Resend
      // Nome do remetente: "Rômulo, Pódium"
      // Se FROM_EMAIL estiver configurado e não for do domínio antigo, será usado
      // Caso contrário, usa o padrão com nome personalizado
      let fromEmail = from;
      if (!fromEmail) {
        if (process.env.FROM_EMAIL && !process.env.FROM_EMAIL.includes('escuderiapodium')) {
          fromEmail = process.env.FROM_EMAIL;
          if (attempt === 0) console.log('📧 [EMAIL] Usando FROM_EMAIL da variável de ambiente:', fromEmail);
        } else {
          fromEmail = 'noreply@pitstop.mundopodium.com.br';
          if (attempt === 0) console.log('📧 [EMAIL] Usando FROM_EMAIL padrão:', fromEmail);
        }
      }
      
      // Adicionar nome do remetente ao email (formato: "Nome <email@dominio.com>")
      // Se o from já tiver nome, manter; caso contrário, adicionar
      let fromWithName = fromEmail;
      if (!fromEmail.includes('<')) {
        fromWithName = `Rômulo, Pódium <${fromEmail}>`;
      }
      
      if (attempt === 0) {
        console.log('📧 [EMAIL] From final com nome:', fromWithName);
        console.log('📧 [EMAIL] Chamando Resend API...');
      }
      
      const { data, error } = await getResend().emails.send({
        from: fromWithName,
        to: [to],
        subject,
        html,
      });

      if (error) {
        lastError = error;
        console.error(`❌ [EMAIL] Tentativa ${attempt + 1} falhou:`, error.message || 'sem mensagem');
        
        // Se for erro de configuração (não temporário), não tentar novamente
        if (error.message?.includes('API key') || error.message?.includes('domain')) {
          console.error('❌ [EMAIL] Erro de configuração detectado, abortando retries');
          return { success: false, error: error.message || 'Erro de configuração' };
        }
        
        // Continuar para próxima tentativa
        continue;
      }

      console.log('✅ [EMAIL] Email enviado com sucesso!');
      console.log('✅ [EMAIL] Message ID:', data?.id);
      if (attempt > 0) {
        console.log(`✅ [EMAIL] Sucesso na tentativa ${attempt + 1}`);
      }
      return { success: true, messageId: data?.id };
      
    } catch (error: any) {
      lastError = error;
      console.error(`❌ [EMAIL] Exceção na tentativa ${attempt + 1}:`, error.message);
      
      // Se for último retry, logar stack completo
      if (attempt === MAX_RETRIES - 1) {
        console.error('❌ [EMAIL] Stack:', error.stack);
      }
    }
  }

  // Se chegou aqui, todas as tentativas falharam
  console.error(`❌ [EMAIL] Todas as ${MAX_RETRIES} tentativas falharam`);
  console.error('❌ [EMAIL] Último erro:', lastError?.message || lastError);
  return { success: false, error: lastError?.message || 'Erro ao enviar email após múltiplas tentativas' };
}

