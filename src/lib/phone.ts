const BR_DDDS = new Set([
  '11', '12', '13', '14', '15', '16', '17', '18', '19',
  '21', '22', '24', '27', '28',
  '31', '32', '33', '34', '35', '37', '38',
  '41', '42', '43', '44', '45', '46', '47', '48', '49',
  '51', '53', '54', '55',
  '61', '62', '63', '64', '65', '66', '67', '68', '69',
  '71', '73', '74', '75', '77', '79',
  '81', '82', '83', '84', '85', '86', '87', '88', '89',
  '91', '92', '93', '94', '95', '96', '97', '98', '99',
]);

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function stripCountryCode(digits: string): string {
  if (digits.startsWith('55') && digits.length >= 12) {
    return digits.slice(2);
  }
  return digits;
}

export function maskBrazilianWhatsApp(value: string): string {
  const digits = stripCountryCode(digitsOnly(value)).slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function hasRepeatedDigits(nationalDigits: string): boolean {
  if (nationalDigits.length < 10) return false;
  if (/^(\d)\1+$/.test(nationalDigits)) return true;
  const local = nationalDigits.slice(2);
  return /^(\d)\1+$/.test(local);
}

export function toE164Brazil(value: string): string | null {
  const national = stripCountryCode(digitsOnly(value));
  if (national.length < 10 || national.length > 11) return null;
  return `+55${national}`;
}

export type PhoneValidation =
  | { ok: true; e164: string }
  | { ok: false; error: string };

export function validateBrazilianWhatsApp(value: string): PhoneValidation {
  const national = stripCountryCode(digitsOnly(value));

  if (national.length < 10 || national.length > 11) {
    return { ok: false, error: 'Informe um WhatsApp com DDD e número.' };
  }

  const ddd = national.slice(0, 2);
  if (!BR_DDDS.has(ddd)) {
    return { ok: false, error: 'DDD inválido.' };
  }

  if (national.length === 11 && national[2] !== '9') {
    return { ok: false, error: 'Celular precisa ter 9 dígitos depois do DDD.' };
  }

  if (hasRepeatedDigits(national)) {
    return { ok: false, error: 'Número inválido: dígitos repetidos.' };
  }

  const e164 = toE164Brazil(national);
  if (!e164) {
    return { ok: false, error: 'Informe um WhatsApp válido.' };
  }

  return { ok: true, e164 };
}

export function validateFullName(value: string): { ok: true } | { ok: false; error: string } {
  const words = value.trim().split(/\s+/).filter((word) => word.length > 0);
  if (words.length < 2) {
    return { ok: false, error: 'Informe nome e sobrenome.' };
  }
  return { ok: true };
}
