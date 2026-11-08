import assert from 'node:assert/strict';
import test from 'node:test';
import {
  descricaoComDia,
  encontroDoDia,
  htmlConfirmacao,
  htmlMeioDia,
  isPaidEvent,
  jaAvisouNoDia,
  pareceDestaEdicao,
} from './corretores-compra-copy.ts';

test('meio-dia só na segunda e na quarta desta edição', () => {
  assert.equal(encontroDoDia(new Date('2026-11-09T15:00:00Z')), '2026-11-09');
  assert.equal(encontroDoDia(new Date('2026-11-11T15:10:00Z')), '2026-11-11');
  assert.equal(encontroDoDia(new Date('2026-11-10T15:00:00Z')), null);
  assert.equal(encontroDoDia(new Date('2026-11-09T14:00:00Z')), null);
  assert.equal(encontroDoDia(new Date('2027-11-09T15:00:00Z')), null);
});

test('marca o dia do lembrete sem repetir', () => {
  const once = descricaoComDia('workshop-corretores', '2026-11-09');
  assert.equal(once, 'workshop-corretores|2026-11-09');
  assert.equal(descricaoComDia(once, '2026-11-09'), once);
  assert.equal(jaAvisouNoDia(once, '2026-11-09'), true);
  assert.equal(jaAvisouNoDia(once, '2026-11-11'), false);
});

test('só pagamento desta edição e evento pago', () => {
  assert.equal(isPaidEvent('PAYMENT_RECEIVED'), true);
  assert.equal(isPaidEvent('PAYMENT_CREATED'), false);
  assert.equal(pareceDestaEdicao({ paymentLink: 'ybyrv6lwt1805z4e' }), true);
  assert.equal(pareceDestaEdicao({ description: 'outro produto' }), false);
  assert.equal(pareceDestaEdicao({}, 'https://www.asaas.com/c/goqsiy1wfafoegfx'), true);
});

test('e-mails citam o grupo e os encontros', () => {
  const compra = htmlConfirmacao('Ana');
  const hora = htmlMeioDia('Ana', '2026-11-09');
  assert.match(compra, /chat\.whatsapp\.com\/F82ZRlJ0NSf9TQ7kz03nAj/);
  assert.match(compra, /Eventos futuros/);
  assert.match(hora, /Falta uma hora|13h/);
  assert.equal(compra.includes('—'), false);
  assert.equal(hora.includes('—'), false);
});
