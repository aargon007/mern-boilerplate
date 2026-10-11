const assert = require('node:assert/strict');
const { once } = require('node:events');
const { test } = require('node:test');

// Explicit fixtures keep tests independent from a developer's .env and database.
Object.assign(process.env, {
    NODE_ENV: 'test',
    PORT: '5001',
    DB_URI: 'mongodb://127.0.0.1:27017/test',
    BCRYPT_SALT_ROUNDS: '10',
    JWT_ACCESS_SECRET: 'test-access-secret',
    JWT_REFRESH_SECRET: 'test-refresh-secret',
    JWT_ACCESS_EXPIRES_IN: '15m',
    JWT_REFRESH_EXPIRES_IN: '7d',
    CLIENT_ORIGIN: 'http://localhost:5173'
});

const config = require('../dist/config').default;
const { createToken } = require('../dist/helpers/jwtHelpers');
const jwt = require('jsonwebtoken');
const app = require('../dist/app').default;

test('environment values become numeric ports, salt rounds and JWT expiry seconds', () => {
    assert.equal(config.port, 5001);
    assert.equal(config.bcrypt_salt_rounds, 10);
    assert.equal(config.jwt_access_expires_in, 900);
    assert.equal(config.jwt_refresh_expires_in, 604800);
    const token = createToken(
        { _id: 'test', email: 'test@example.com', role: 'user' },
        config.jwt_access_secret,
        config.jwt_access_expires_in
    );
    const payload = jwt.verify(token, config.jwt_access_secret);
    assert.equal(payload.exp - payload.iat, 900);
});

test('built API serves assets, rejects invalid requests and handles unknown routes', async (t) => {
    const server = app.listen(0, '127.0.0.1');
    await once(server, 'listening');
    t.after(() => new Promise((resolve) => server.close(resolve)));
    const base = `http://127.0.0.1:${server.address().port}`;
    const missing = await fetch(`${base}/api/v1/missing`);
    assert.equal(missing.status, 404);
    assert.equal((await missing.json()).success, false);
    const page = await fetch(`${base}/missing`);
    assert.equal(page.status, 404);
    assert.match(page.headers.get('content-type'), /text\/html/);
    const invalid = await fetch(`${base}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{}'
    });
    assert.equal(invalid.status, 400);
    for (const authorization of [undefined, 'Bearer invalid']) {
        const response = await fetch(`${base}/api/v1/auth/change-password`, {
            method: 'POST',
            headers: authorization ? { authorization } : {}
        });
        assert.equal(response.status, 401);
    }
});
