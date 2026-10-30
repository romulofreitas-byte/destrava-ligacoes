import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  getSalaDeGuerraConfirmationHtml,
  salaConfirmationSubject,
  salaQuandoLabel,
} from './sala-de-guerra-email.ts';

const FRIDAY = new Date('2026-10-30T18:30:00-03:00');
const SATURDAY = new Date('2026-10-31T08:00:00-03:00');

test('na sexta o e-mail fala de amanhã e traz o Meet', () => {
  assert.equal(salaQuandoLabel(FRIDAY), 'Amanhã, sábado, 31/10, às 10h');
  assert.equal(salaConfirmationSubject(FRIDAY), 'Amanhã, 10h: Sala de Guerra Pós-Eleição');
  const html = getSalaDeGuerraConfirmationHtml('Rômulo Freitas', FRIDAY);
  assert.match(html, /Olá, <strong>Rômulo<\/strong>/);
  assert.match(html, /https:\/\/meet\.google\.com\/gsf-eqeb-sjp/);
  assert.doesNotMatch(html, /WhatsApp|grupo/i);
});

test('no sábado de manhã o e-mail fala de hoje', () => {
  assert.equal(salaQuandoLabel(SATURDAY), 'Hoje, sábado, 31/10, às 10h');
  assert.equal(salaConfirmationSubject(SATURDAY), 'Hoje, 10h: Sala de Guerra Pós-Eleição');
});
