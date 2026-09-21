import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatAulaQuandoLabel, getRelativeDayLabel } from './aula-date.ts';

const CLASS_AT = '2026-09-21T20:30:00-03:00';

test('mesmo dia civil → Hoje', () => {
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-21T09:00:00-03:00')), 'Hoje');
  assert.equal(formatAulaQuandoLabel(CLASS_AT, new Date('2026-09-21T09:00:00-03:00')), 'Hoje, 20:30');
});

test('dia civil seguinte → Amanhã', () => {
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-20T21:00:00-03:00')), 'Amanhã');
  assert.equal(formatAulaQuandoLabel(CLASS_AT, new Date('2026-09-20T21:00:00-03:00')), 'Amanhã, 20:30');
});

test('2 a 6 dias à frente → nome do dia', () => {
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-16T12:00:00-03:00')), 'Segunda');
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-18T12:00:00-03:00')), 'Segunda');
});

test('7 dias ou mais → dia/mês', () => {
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-10T12:00:00-03:00')), '21/09');
  assert.equal(formatAulaQuandoLabel(CLASS_AT, new Date('2026-09-10T12:00:00-03:00')), '21/09, 20:30');
});

test('já passou → Encerrada', () => {
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-21T20:30:00-03:00')), 'Encerrada');
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-22T00:00:00-03:00')), 'Encerrada');
});

test('virada de meia-noite BRT', () => {
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-20T23:59:59-03:00')), 'Amanhã');
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-21T00:00:00-03:00')), 'Hoje');
});
