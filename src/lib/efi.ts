// Cliente para integração com Banco Efí API Pix
import * as fs from 'fs';
import * as https from 'https';
import { Agent } from 'https';

// Configuração da API Efí
const EFI_API_BASE = process.env.EFI_API_BASE || 'https://pix.api.efipay.com.br';
const EFI_OAUTH_URL = process.env.EFI_OAUTH_URL || `${EFI_API_BASE}/oauth/token`;
const EFI_CLIENT_ID = process.env.EFI_CLIENT_ID;
const EFI_CLIENT_SECRET = process.env.EFI_CLIENT_SECRET;
const EFI_CERTIFICATE_PATH = process.env.EFI_CERTIFICATE_PATH;
const EFI_CERTIFICATE_PASSWORD = process.env.EFI_CERTIFICATE_PASSWORD || '';
const EFI_ENVIRONMENT = process.env.EFI_ENVIRONMENT || 'production';

// Cache do access token
let cachedAccessToken: { token: string; expiresAt: number } | null = null;

// Cache do agente HTTPS com certificado
let httpsAgent: Agent | null = null;

/**
 * Obtém ou cria o agente HTTPS com certificado
 */
function getHttpsAgent(): Agent {
  if (httpsAgent) {
    return httpsAgent;
  }

  if (!EFI_CERTIFICATE_PATH) {
    throw new Error('EFI_CERTIFICATE_PATH não configurado');
  }

  try {
    const certificate = fs.readFileSync(EFI_CERTIFICATE_PATH);
    httpsAgent = new Agent({
      pfx: certificate,
      passphrase: EFI_CERTIFICATE_PASSWORD,
      rejectUnauthorized: true,
    });
    return httpsAgent;
  } catch (error: any) {
    throw new Error(`Erro ao carregar certificado: ${error.message}`);
  }
}

export interface EfiOAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface EfipixCustomer {
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
}

export interface EfipixChargeRequest {
  calendario?: {
    expiracao?: number; // em segundos
  };
  devedor?: {
    cpf?: string;
    cnpj?: string;
    nome?: string;
  };
  valor: {
    original: string; // valor em reais com 2 casas decimais
  };
  chave?: string; // chave Pix
  solicitacaoPagador?: string; // descrição
  infoAdicionais?: Array<{
    nome: string;
    valor: string;
  }>;
}

export interface EfipixChargeResponse {
  calendario: {
    criacao: string;
    expiracao: number;
  };
  txid: string;
  revisao: number;
  loc: {
    id: number;
    location: string;
    tipoCob: string;
    criacao: string;
  };
  status: string;
  devedor?: {
    cpf?: string;
    cnpj?: string;
    nome?: string;
  };
  valor: {
    original: string;
  };
  chave: string;
  solicitacaoPagador?: string;
  pixCopiaECola?: string;
  qrcode?: string;
}

export interface EfipixWebhookNotification {
  pix?: Array<{
    endToEndId: string;
    txid: string;
    valor: string;
    chave: string;
    horario: string;
    infoPagador?: string;
  }>;
}

/**
 * Obtém um access token via OAuth2 usando certificado P12
 */
async function getAccessToken(): Promise<string> {
  // Verificar se há token em cache válido
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
    return cachedAccessToken.token;
  }

  if (!EFI_CLIENT_ID || !EFI_CLIENT_SECRET) {
    throw new Error('EFI_CLIENT_ID e EFI_CLIENT_SECRET não configurados');
  }

  if (!EFI_CERTIFICATE_PATH) {
    throw new Error('EFI_CERTIFICATE_PATH não configurado');
  }

  try {
    const agent = getHttpsAgent();
    
    // Criar Basic Auth header
    const credentials = Buffer.from(`${EFI_CLIENT_ID}:${EFI_CLIENT_SECRET}`).toString('base64');

    // Fazer requisição OAuth2 usando https nativo
    const url = new URL(EFI_OAUTH_URL);
    const postData = JSON.stringify({
      grant_type: 'client_credentials',
    });

    const data = await new Promise<EfiOAuthResponse>((resolve, reject) => {
      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
        agent: agent,
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const parsed = JSON.parse(responseData) as EfiOAuthResponse;
              resolve(parsed);
            } catch (error) {
              reject(new Error(`Erro ao parsear resposta: ${error}`));
            }
          } else {
            reject(new Error(`Erro ao obter access token: ${res.statusCode} ${responseData}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Erro na requisição: ${error.message}`));
      });

      req.write(postData);
      req.end();
    });

    // Cachear token (expira 5 minutos antes do tempo real para segurança)
    const expiresIn = (data.expires_in || 3600) * 1000; // converter para ms
    cachedAccessToken = {
      token: data.access_token,
      expiresAt: Date.now() + expiresIn - 5 * 60 * 1000, // 5 minutos de margem
    };

    console.log('✅ Access token obtido do Banco Efí');
    return data.access_token;
  } catch (error: any) {
    console.error('❌ Erro ao obter access token do Banco Efí:', error.message);
    throw error;
  }
}

/**
 * Faz uma requisição autenticada para a API do Banco Efí
 */
async function makeAuthenticatedRequest(
  endpoint: string,
  options: { method?: string; body?: string } = {}
): Promise<any> {
  const accessToken = await getAccessToken();
  const fullUrl = `${EFI_API_BASE}${endpoint}`;
  const url = new URL(fullUrl);
  const agent = getHttpsAgent();

  return new Promise((resolve, reject) => {
    const requestOptions: {
      hostname: string;
      port: number | string;
      path: string;
      method: string;
      headers: Record<string, string>;
      agent: any;
    } = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      agent: agent,
    };

    const req = https.request(requestOptions, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = responseData ? JSON.parse(responseData) : {};
            resolve(parsed);
          } catch (error) {
            reject(new Error(`Erro ao parsear resposta: ${error}`));
          }
        } else {
          reject(new Error(`Erro na requisição: ${res.statusCode} ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Erro na requisição: ${error.message}`));
    });

    if (options.body) {
      requestOptions.headers['Content-Length'] = Buffer.byteLength(options.body).toString();
      req.write(options.body);
    }

    req.end();
  });
}

/**
 * Cria uma cobrança PIX imediata
 */
export async function createPixCharge(
  amount: number,
  description: string,
  customer?: EfipixCustomer,
  expirationMinutes: number = 30
): Promise<EfipixChargeResponse> {
  try {
    const chargeData: EfipixChargeRequest = {
      calendario: {
        expiracao: expirationMinutes * 60, // converter minutos para segundos
      },
      valor: {
        original: amount.toFixed(2), // formato: "49.99"
      },
      solicitacaoPagador: description,
      ...(customer?.nome || customer?.cpf ? {
        devedor: {
          ...(customer.cpf ? { cpf: customer.cpf.replace(/\D/g, '') } : {}),
          ...(customer.nome ? { nome: customer.nome } : {}),
        },
      } : {}),
      infoAdicionais: [
        {
          nome: 'Descricao',
          valor: description,
        },
        ...(customer?.email ? [{
          nome: 'Email',
          valor: customer.email,
        }] : []),
      ],
    };

    const data: EfipixChargeResponse = await makeAuthenticatedRequest('/v2/cob', {
      method: 'POST',
      body: JSON.stringify(chargeData),
    });

    console.log('✅ Cobrança PIX criada:', data.txid);
    return data;
  } catch (error: any) {
    console.error('❌ Erro ao criar cobrança PIX:', error.message);
    throw error;
  }
}

/**
 * Consulta o status de uma cobrança PIX pelo txid
 */
export async function getPixChargeStatus(txid: string): Promise<EfipixChargeResponse> {
  try {
    const data: EfipixChargeResponse = await makeAuthenticatedRequest(`/v2/cob/${txid}`);
    return data;
  } catch (error: any) {
    console.error('❌ Erro ao consultar cobrança PIX:', error.message);
    throw error;
  }
}

/**
 * Consulta PIX recebidos em um período
 */
export async function getReceivedPix(
  startDate: string,
  endDate: string
): Promise<EfipixWebhookNotification> {
  try {
    const params = new URLSearchParams({
      inicio: startDate,
      fim: endDate,
    });

    const data: EfipixWebhookNotification = await makeAuthenticatedRequest(`/v2/pix?${params.toString()}`);
    return data;
  } catch (error: any) {
    console.error('❌ Erro ao consultar PIX recebidos:', error.message);
    throw error;
  }
}

/**
 * Valida a assinatura de um webhook do Banco Efí
 * Nota: A validação completa requer a chave pública do Banco Efí
 * Por enquanto, apenas verifica se os dados necessários estão presentes
 */
export function validateWebhookSignature(
  body: any,
  signature?: string
): boolean {
  // Validação básica - verificar se há dados de PIX
  if (!body || typeof body !== 'object') {
    return false;
  }

  // Se houver signature, validar (implementar validação completa conforme documentação)
  if (signature && process.env.EFI_WEBHOOK_SECRET) {
    // TODO: Implementar validação de assinatura HMAC se necessário
    // Por enquanto, apenas verificar se a signature está presente
    return signature.length > 0;
  }

  // Validação básica: verificar se tem estrutura de webhook
  return body.pix !== undefined || body.txid !== undefined;
}

/**
 * Extrai informações do cliente de uma notificação de webhook
 */
export function extractCustomerFromWebhook(
  webhookData: EfipixWebhookNotification
): { email?: string; nome?: string; txid?: string; valor?: number } | null {
  if (!webhookData.pix || webhookData.pix.length === 0) {
    return null;
  }

  const pix = webhookData.pix[0];
  
  // O webhook do Banco Efí pode não incluir email diretamente
  // Será necessário buscar no Supabase usando o txid
  return {
    txid: pix.txid,
    valor: parseFloat(pix.valor),
    // Email e nome precisam ser buscados do Supabase ou da cobrança original
  };
}

