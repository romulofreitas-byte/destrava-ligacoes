import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  ONDA1_FIM_PADRAO,
  resolveOfertaCorretores,
} from './workshop-corretores-estado.ts';

const CHECKOUT_1 = 'https://checkout.example/onda1';
const CHECKOUT_2 = 'https://checkout.example/onda2';

function oferta(iso: string, extra?: { forcar?: string; permitir?: boolean; c1?: string; c2?: string }) {
  return resolveOfertaCorretores({
    now: new Date(iso),
    checkoutOnda1: extra?.c1 ?? CHECKOUT_1,
    checkoutOnda2: extra?.c2 ?? CHECKOUT_2,
    estadoForcado: extra?.forcar,
    permitirForcar: extra?.permitir,
  });
}

test('até 12/01 12h59:59 o ingresso é R$897', () => {
  const result = oferta(ONDA1_FIM_PADRAO);
  assert.equal(result.estado, 'onda1');
  assert.equal(result.precoLabel, 'R$897');
  assert.equal(result.precoCheio, 'R$1.497');
  assert.equal(result.contagemLegenda, 'Esse preço acaba em');
  assert.equal(result.rotulo, '17ª edição · 12 e 14/01, 13h');
  assert.equal(result.amountBRL, 897);
  assert.equal(result.onda, 1);
  assert.equal(result.ctaEnabled, true);
  assert.equal(result.checkoutUrl, CHECKOUT_1);
  assert.deepEqual(result.pixLinhas, ['Pix ou cartão.']);
  assert.deepEqual(result.urgencia, [
    'O link de pagamento entra no ar em seguida.',
    'As inscrições encerram terça, 12/01, às 13h.',
  ]);
});

test('sem checkout o preço aparece e o botão fica desligado', () => {
  const result = resolveOfertaCorretores({
    now: new Date('2026-11-25T15:00:00-03:00'),
  });
  assert.equal(result.estado, 'onda1');
  assert.equal(result.precoLabel, 'R$897');
  assert.equal(result.precoCheio, 'R$1.497');
  assert.equal(result.checkoutUrl, null);
  assert.equal(result.ctaEnabled, false);
  assert.equal(result.fimIso, null);
  assert.equal(result.contagemLegenda, null);
});

test('um segundo antes da virada ainda é onda 1', () => {
  assert.equal(oferta('2027-01-12T12:59:58-03:00').estado, 'onda1');
});

test('12/01 às 13h encerra, sem preço e sem checkout', () => {
  const result = oferta('2027-01-12T13:00:00-03:00');
  assert.equal(result.estado, 'encerrada');
  assert.equal(result.precoLabel, null);
  assert.equal(result.precoCheio, null);
  assert.equal(result.checkoutUrl, null);
  assert.equal(result.ctaEnabled, false);
  assert.equal(result.fimIso, null);
  assert.match(result.rotulo, /encerradas/);
});

test('link vazio desabilita o botão da onda ativa', () => {
  const onda1 = oferta('2027-01-01T10:00:00-03:00', { c1: '   ', c2: CHECKOUT_2 });
  assert.equal(onda1.estado, 'onda1');
  assert.equal(onda1.checkoutUrl, null);
  assert.equal(onda1.ctaEnabled, false);
  assert.equal(onda1.contagemLegenda, null);
});

test('query de estado só vale quando permitido', () => {
  const bloqueado = oferta('2027-01-01T10:00:00-03:00', {
    forcar: 'encerrada',
    permitir: false,
  });
  assert.equal(bloqueado.estado, 'onda1');
  assert.equal(bloqueado.simulado, false);

  const liberado = oferta('2027-01-01T10:00:00-03:00', {
    forcar: 'encerrada',
    permitir: true,
  });
  assert.equal(liberado.estado, 'encerrada');
  assert.equal(liberado.simulado, true);
});

test('data de env inválida cai no padrão', () => {
  const result = resolveOfertaCorretores({
    now: new Date(ONDA1_FIM_PADRAO),
    onda1Fim: 'nao-e-data',
    onda2Fim: '',
    checkoutOnda1: CHECKOUT_1,
  });
  assert.equal(result.estado, 'onda1');
});
