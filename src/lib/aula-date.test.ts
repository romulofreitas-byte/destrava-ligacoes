import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatAulaJanelaEmail, formatAulaQuandoLabel, getRelativeDayLabel } from './aula-date.ts';

const CLASS_AT = '2026-09-21T20:30:00-03:00';

test('antes da aula → data e hora', () => {
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-10T12:00:00-03:00')), '21/09');
  assert.equal(formatAulaQuandoLabel(CLASS_AT, new Date('2026-09-10T12:00:00-03:00')), '21/09, 20:30');
  assert.equal(formatAulaQuandoLabel(CLASS_AT, new Date('2026-09-20T23:30:00-03:00')), 'Amanhã, 20:30');
  assert.equal(formatAulaQuandoLabel(CLASS_AT, new Date('2026-09-21T09:00:00-03:00')), 'Hoje, 20:30');
});

test('janela do e-mail sai da data e da duração', () => {
  assert.equal(
    formatAulaJanelaEmail('2026-09-21T20:30:00-03:00', 90),
    'Segunda, 21/09 · 20:30 às 22:00 · horário de Brasília'
  );
  assert.equal(
    formatAulaJanelaEmail('2026-11-05T20:00:00-03:00', 90),
    'Quinta, 05/11 · 20:00 às 21:30 · horário de Brasília'
  );
});

test('já passou → Encerrada', () => {
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-21T20:30:00-03:00')), 'Encerrada');
  assert.equal(formatAulaQuandoLabel(CLASS_AT, new Date('2026-09-22T00:00:00-03:00')), 'Encerrada');
});
