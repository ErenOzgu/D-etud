const test = require('node:test');
const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');

const User = require('../src/models/user.model');
const Question = require('../src/models/question.model');

const fields = (err) => Object.keys(err?.errors ?? {});

test('User: ad, e-posta ve şifre zorunlu', () => {
  const err = new User({}).validateSync();
  assert.deepEqual(fields(err).sort(), ['email', 'name', 'password']);
});

test('User: şifre en az 6 karakter olmalı', () => {
  const err = new User({ name: 'A', email: 'a@b.co', password: '12345' }).validateSync();
  assert.deepEqual(fields(err), ['password']);
  assert.equal(new User({ name: 'A', email: 'a@b.co', password: '123456' }).validateSync(), undefined);
});

test('User: varsayılanlar ve e-posta küçük harfe çevrilir', () => {
  const u = new User({ name: 'Eren', email: 'EREN@Detud.COM', password: 'secret1' });
  assert.equal(u.role, 'student');
  assert.equal(u.isActive, true);
  assert.equal(u.email, 'eren@detud.com');
});

test('User: geçersiz rol reddedilir', () => {
  const err = new User({ name: 'A', email: 'a@b.co', password: 'secret1', role: 'hacker' }).validateSync();
  assert.deepEqual(fields(err), ['role']);
});

test('User: toJSON şifreyi içermez', () => {
  const u = new User({ name: 'A', email: 'a@b.co', password: 'secret1' });
  assert.equal('password' in u.toJSON(), false);
});

test('User: comparePassword bcrypt özetiyle çalışır', async () => {
  const u = new User({ name: 'A', email: 'a@b.co', password: bcrypt.hashSync('secret1', 4) });
  assert.equal(await u.comparePassword('secret1'), true);
  assert.equal(await u.comparePassword('wrong-pass'), false);
});

test('Question: başlık, içerik, konu ve yazar zorunlu', () => {
  const err = new Question({}).validateSync();
  assert.deepEqual(fields(err).sort(), ['author', 'content', 'subject', 'title']);
});

test('Question: konu listesi dışındaki değer reddedilir', () => {
  const base = { title: 'T', content: 'C', author: '64b64c9f2f8f2f2f2f2f2f2f' };
  assert.deepEqual(fields(new Question({ ...base, subject: 'astroloji' }).validateSync()), ['subject']);
  assert.equal(new Question({ ...base, subject: 'matematik' }).validateSync(), undefined);
});

test('Question: varsayılan durum açık, görüntülenme 0, cevap yok', () => {
  const q = new Question({ title: 'T', content: 'C', subject: 'fizik', author: '64b64c9f2f8f2f2f2f2f2f2f' });
  assert.equal(q.status, 'open');
  assert.equal(q.views, 0);
  assert.equal(q.answers.length, 0);
  assert.equal(q.isFeatured, false);
});

test('Question: cevap için içerik ve yazar zorunlu', () => {
  const q = new Question({
    title: 'T', content: 'C', subject: 'kimya', author: '64b64c9f2f8f2f2f2f2f2f2f',
    answers: [{}],
  });
  assert.deepEqual(fields(q.validateSync()).sort(), ['answers.0.author', 'answers.0.content']);
});
