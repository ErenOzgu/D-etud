const test = require('node:test');
const assert = require('node:assert/strict');

process.env.JWT_SECRET = 'test-secret';
const { protect, authorize } = require('../src/middleware/auth.middleware');

function mockRes() {
  return {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
}

test('protect: Authorization başlığı yoksa 401 döner', async () => {
  const res = mockRes();
  let called = false;
  await protect({ headers: {} }, res, () => { called = true; });
  assert.equal(res.statusCode, 401);
  assert.equal(res.body.success, false);
  assert.equal(called, false);
});

test('protect: geçersiz token ile 401 döner', async () => {
  const res = mockRes();
  let called = false;
  await protect({ headers: { authorization: 'Bearer not-a-real-token' } }, res, () => { called = true; });
  assert.equal(res.statusCode, 401);
  assert.equal(called, false);
});

test('authorize: rol listede değilse 403 döner', () => {
  const res = mockRes();
  let called = false;
  authorize('admin')({ user: { role: 'student' } }, res, () => { called = true; });
  assert.equal(res.statusCode, 403);
  assert.equal(called, false);
});

test('authorize: rol listedeyse devam eder', () => {
  const res = mockRes();
  let called = false;
  authorize('admin', 'teacher')({ user: { role: 'teacher' } }, res, () => { called = true; });
  assert.equal(res.statusCode, null);
  assert.equal(called, true);
});
