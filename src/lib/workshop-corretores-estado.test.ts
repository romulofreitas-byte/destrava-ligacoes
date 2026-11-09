import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  ONDA1_FIM_PADRAO,
  ONDA2_FIM_PADRAO,
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

test('até 06/11 23h59:59 continua na onda 1', () => {
  const result = oferta(ONDA1_FIM_PADRAO);
  assert.equal(result.estado, 'onda1');
  assert.equal(result.precoLabel, 'R$497');
  assert.equal(result.precoCheio, 'R$897');
  assert.equal(result.contagemLegenda, 'Esse preço acaba em');
  assert.equal(result.rotulo, 'Black Friday até sexta, 06/11, 23h59');
  assert.equal(result.amountBRL, 497);
  assert.equal(result.onda, 1);
  assert.equal(result.ctaEnabled, true);
  assert.equal(result.checkoutUrl, CHECKOUT_1);
  assert.deepEqual(result.pixLinhas, ['Pix ou cartão.']);
  assert.deepEqual(result.urgencia, [
    'O preço muda no sábado, 07/11.',
    'As inscrições encerram quarta, 11/11, às 13h.',
  ]);
});

test('00:00:00 de 07/11 abre a onda 2', () => {
  const result = oferta('2026-11-07T00:00:00-03:00');
  assert.equal(result.estado, 'onda2');
  assert.equal(result.precoLabel, 'R$597');
  assert.equal(result.amountBRL, 597);
  assert.equal(result.onda, 2);
  assert.equal(result.checkoutUrl, CHECKOUT_2);
  assert.equal(result.pixLinhas.length, 2);
  assert.deepEqual(result.urgencia, [
    'Última chamada.',
    'As inscrições encerram quarta, 11/11, às 13h.',
  ]);
  assert.match(result.contagemLegenda || '', /Última chance/);
});

test('um segundo antes da virada ainda é onda 1', () => {
  assert.equal(oferta('2026-11-06T23:59:58-03:00').estado, 'onda1');
});

test('09/11 ao meio-dia continua na onda 2', () => {
  assert.equal(oferta('2026-11-09T12:00:00-03:00').estado, 'onda2');
});

test('até 11/11 12h59:59 continua na onda 2', () => {
  assert.equal(oferta(ONDA2_FIM_PADRAO).estado, 'onda2');
});

test('11/11 às 13h encerra, sem preço e sem checkout', () => {
  const result = oferta('2026-11-11T13:00:00-03:00');
  assert.equal(result.estado, 'encerrada');
  assert.equal(result.precoLabel, null);
  assert.equal(result.precoCheio, null);
  assert.equal(result.checkoutUrl, null);
  assert.equal(result.ctaEnabled, false);
  assert.equal(result.fimIso, null);
  assert.match(result.rotulo, /encerradas/);
});

test('link vazio desabilita o botão da onda ativa', () => {
  const onda1 = oferta('2026-11-01T10:00:00-03:00', { c1: '   ', c2: CHECKOUT_2 });
  assert.equal(onda1.estado, 'onda1');
  assert.equal(onda1.checkoutUrl, null);
  assert.equal(onda1.ctaEnabled, false);

  const onda2 = oferta('2026-11-08T10:00:00-03:00', { c2: '' });
  assert.equal(onda2.estado, 'onda2');
  assert.equal(onda2.ctaEnabled, false);
});

test('query de estado só vale quando permitido', () => {
  const bloqueado = oferta('2026-11-01T10:00:00-03:00', {
    forcar: 'encerrada',
    permitir: false,
  });
  assert.equal(bloqueado.estado, 'onda1');
  assert.equal(bloqueado.simulado, false);

  const liberado = oferta('2026-11-01T10:00:00-03:00', {
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
