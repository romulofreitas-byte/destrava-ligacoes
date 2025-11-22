// Helper functions para uso no frontend

export interface PaymentResponse {
  success: boolean;
  payment: {
    id: string;
    reference_id: string;
    status: string;
    created_at: string;
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
  };
}

export async function criarPagamentoPix(
  amount: number,
  description: string,
  referenceId: string,
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
): Promise<PaymentResponse> {
  const response = await fetch('/api/pagamento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'PIX',
      amount,
      description,
      referenceId,
      customer,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao criar pagamento');
  }

  return response.json();
}

export async function criarPagamentoCartao(
  amount: number,
  description: string,
  referenceId: string,
  installments: number,
  cardData: {
    number: string;
    exp_month: string;
    exp_year: string;
    security_code: string;
    holder_name: string;
  },
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
): Promise<PaymentResponse> {
  const response = await fetch('/api/pagamento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'CREDIT_CARD',
      amount,
      description,
      referenceId,
      installments,
      cardData,
      customer,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao criar pagamento');
  }

  return response.json();
}

export async function consultarStatusPagamento(chargeId: string) {
  const response = await fetch(`/api/pagamento/status?charge_id=${chargeId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao consultar status');
  }

  return response.json();
}


