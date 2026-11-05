import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  aulaLembreteCutoff,
  aulaLembreteKindAt,
  formatAulaJanelaEmail,
  formatAulaQuandoLabel,
  getRelativeDayLabel,
} from './aula-date.ts';

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

const NOVA = '2026-11-05T20:00:00-03:00';

test('lembrete da véspera às 10h, só para quem entrou antes da quarta', () => {
  const quarta10 = new Date('2026-11-04T10:00:00-03:00');
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-04T09:59:00-03:00')), null);
  assert.equal(aulaLembreteKindAt(NOVA, quarta10), 'vespera');
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-04T23:00:00-03:00')), 'vespera');
  assert.ok(new Date('2026-11-03T23:00:00-03:00') < aulaLembreteCutoff(NOVA, 'vespera'));
  assert.ok(!(new Date('2026-11-04T09:00:00-03:00') < aulaLembreteCutoff(NOVA, 'vespera')));
});

test('lembretes do dia: meio-dia, 18h, 19h30 e o começo', () => {
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-05T11:59:00-03:00')), null);
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-05T12:00:00-03:00')), 'meio-dia');
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-05T17:59:00-03:00')), 'meio-dia');
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-05T18:00:00-03:00')), 'dia');
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-05T19:29:00-03:00')), 'dia');
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-05T19:30:00-03:00')), 'trinta');
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-05T20:00:00-03:00')), 'inicio');
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-05T20:44:00-03:00')), 'inicio');
  assert.equal(aulaLembreteKindAt(NOVA, new Date('2026-11-05T20:45:00-03:00')), null);
  assert.ok(new Date('2026-11-05T11:00:00-03:00') < aulaLembreteCutoff(NOVA, 'meio-dia'));
  assert.ok(!(new Date('2026-11-05T12:00:00-03:00') < aulaLembreteCutoff(NOVA, 'meio-dia')));
  assert.ok(new Date('2026-11-04T15:00:00-03:00') < aulaLembreteCutoff(NOVA, 'dia'));
  assert.ok(!(new Date('2026-11-05T18:00:00-03:00') < aulaLembreteCutoff(NOVA, 'dia')));
  assert.ok(new Date('2026-11-05T19:00:00-03:00') < aulaLembreteCutoff(NOVA, 'trinta'));
  assert.ok(!(new Date('2026-11-05T19:30:00-03:00') < aulaLembreteCutoff(NOVA, 'trinta')));
  assert.ok(new Date('2026-11-05T19:59:00-03:00') < aulaLembreteCutoff(NOVA, 'inicio'));
  assert.ok(!(new Date('2026-11-05T20:00:00-03:00') < aulaLembreteCutoff(NOVA, 'inicio')));
});

test('já passou → Encerrada', () => {
  assert.equal(getRelativeDayLabel(CLASS_AT, new Date('2026-09-21T20:30:00-03:00')), 'Encerrada');
  assert.equal(formatAulaQuandoLabel(CLASS_AT, new Date('2026-09-22T00:00:00-03:00')), 'Encerrada');
});
