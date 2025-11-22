// Cliente para integração com PagBank API
const PAGBANK_API_BASE = process.env.PAGBANK_ENVIRONMENT === 'production' 
  ? 'https://api.pagseguro.com' 
  : 'https://sandbox.api.pagseguro.com';

const PAGBANK_TOKEN = process.env.PAGBANK_TOKEN;

export interface PagBankPaymentRequest {
  reference_id: string;
  description: string;
  amount: {
    value: number;
    currency: string;
  };
  payment_method: {
    type: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BOLETO';
    installments?: number;
    capture?: boolean;
    card?: {
      number: string;
      exp_month: string;
      exp_year: string;
      security_code: string;
      holder: {
        name: string;
      };
    };
    pix?: {
      expiration_date?: string;
    };
  };
  customer?: {
    name?: string;
    email?: string;
    tax_id?: string;
    phone?: {
      country?: string;
      area?: string;
      number?: string;
    };
  };
  notification_urls?: string[];
  callback_url?: string;
}

export interface PagBankPaymentResponse {
  id: string;
  reference_id: string;
  status: string;
  created_at: string;
  customer?: {
    name?: string;
    email?: string;
    tax_id?: string;
    phone?: {
      country?: string;
      area?: string;
      number?: string;
    };
  };
  payment_response?: {
    code?: string;
    message?: string;
    reference?: string;
  };
  qr_codes?: Array<{
    id: string;
    text: string;
    links: Array<{
      rel: string;
      href: string;
    }>;
  }>;
  links?: Array<{
    rel: string;
    href: string;
    media: string;
    type: string;
  }>;
}

export async function createPayment(
  paymentData: PagBankPaymentRequest
): Promise<PagBankPaymentResponse> {
  if (!PAGBANK_TOKEN) {
    throw new Error('PAGBANK_TOKEN não configurado');
  }

  const response = await fetch(`${PAGBANK_API_BASE}/charges`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PAGBANK_TOKEN}`,
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(`Erro ao criar pagamento: ${error.message || response.statusText}`);
  }

  return response.json();
}

export async function getPaymentStatus(chargeId: string): Promise<PagBankPaymentResponse> {
  if (!PAGBANK_TOKEN) {
    throw new Error('PAGBANK_TOKEN não configurado');
  }

  const response = await fetch(`${PAGBANK_API_BASE}/charges/${chargeId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${PAGBANK_TOKEN}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(`Erro ao consultar pagamento: ${error.message || response.statusText}`);
  }

  return response.json();
}

// Função auxiliar para criar pagamento PIX
export function createPixPayment(
  referenceId: string,
  description: string,
  amount: number,
  notificationUrl?: string,
  callbackUrl?: string,
  customer?: {
    name?: string;
    email?: string;
    tax_id?: string;
    phone?: {
      country?: string;
      area?: string;
      number?: string;
    };
  }
): PagBankPaymentRequest {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';
  const defaultCallbackUrl = `${baseUrl}/api/pagamento/callback`;
  
  return {
    reference_id: referenceId,
    description,
    amount: {
      value: amount * 100, // Converter para centavos
      currency: 'BRL',
    },
    payment_method: {
      type: 'PIX',
      pix: {
        expiration_date: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
      },
    },
    ...(customer ? { customer } : {}),
    notification_urls: notificationUrl ? [notificationUrl] : [`${baseUrl}/api/pagamento/webhook`],
    // Adicionar callback_url se necessário (algumas versões da API suportam)
    ...(callbackUrl || defaultCallbackUrl ? { callback_url: callbackUrl || defaultCallbackUrl } : {}),
  };
}

// Função auxiliar para criar pagamento com cartão
export function createCreditCardPayment(
  referenceId: string,
  description: string,
  amount: number,
  installments: number,
  cardData: {
    number: string;
    exp_month: string;
    exp_year: string;
    security_code: string;
    holder_name: string;
  },
  notificationUrl?: string,
  callbackUrl?: string,
  customer?: {
    name?: string;
    email?: string;
    tax_id?: string;
    phone?: {
      country?: string;
      area?: string;
      number?: string;
    };
  }
): PagBankPaymentRequest {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';
  const defaultCallbackUrl = `${baseUrl}/api/pagamento/callback`;
  
  return {
    reference_id: referenceId,
    description,
    amount: {
      value: amount * 100, // Converter para centavos
      currency: 'BRL',
    },
    payment_method: {
      type: 'CREDIT_CARD',
      installments,
      capture: true,
      card: {
        number: cardData.number,
        exp_month: cardData.exp_month,
        exp_year: cardData.exp_year,
        security_code: cardData.security_code,
        holder: {
          name: cardData.holder_name,
        },
      },
    },
    ...(customer ? { customer } : {}),
    notification_urls: notificationUrl ? [notificationUrl] : [`${baseUrl}/api/pagamento/webhook`],
    // Adicionar callback_url se necessário (algumas versões da API suportam)
    ...(callbackUrl || defaultCallbackUrl ? { callback_url: callbackUrl || defaultCallbackUrl } : {}),
  };
}

