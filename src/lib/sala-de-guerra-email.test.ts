import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  getSalaDeGuerraConfirmationHtml,
  salaConfirmationSubject,
  salaQuandoLabel,
} from './sala-de-guerra-email.ts';

const FRIDAY = new Date('2026-10-30T18:30:00-03:00');
const SATURDAY = new Date('2026-10-31T08:00:00-03:00');

test('na sexta o e-mail fala de amanhã e traz o convite da plataforma', () => {
  assert.equal(salaQuandoLabel(FRIDAY), 'Amanhã, sábado, 31/10, às 10h');
  assert.equal(salaConfirmationSubject(FRIDAY), 'Amanhã, 10h: Sala de Guerra Pós-Eleição');
  const html = getSalaDeGuerraConfirmationHtml('Rômulo Freitas', FRIDAY);
  assert.match(html, /Olá, <strong>Rômulo<\/strong>/);
  assert.match(html, /invitation_token=6081e7a74f962c19c99765d9cdb9dc73ad39107b-37028ed2-b88b-4870-8c95-b76bffcd4cdb/);
  assert.doesNotMatch(html, /teste gratuito|acesso limitado|acesso total/i);
});

test('no sábado de manhã o e-mail fala de hoje', () => {
  assert.equal(salaQuandoLabel(SATURDAY), 'Hoje, sábado, 31/10, às 10h');
  assert.equal(salaConfirmationSubject(SATURDAY), 'Hoje, 10h: Sala de Guerra Pós-Eleição');
});
