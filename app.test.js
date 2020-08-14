const request = require('supertest');

const app = require('./app');

describe('GET /sync', () => {
  it('should return response', async () => {
    const res = await request(app).get('/sync')
    expect(res.body).toEqual({ immediate: 'Now', postponed: 'or never!' });
  });
});

describe('GET /straming', () => {
  it('should return response', async () => {
    const res = await request(app).get('/streaming')
    expect(res.body).toEqual({ immediate: 'Now', postponed: 'or never!' });
  });
});
