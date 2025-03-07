const request = require('supertest');
const app = require('./app');


it('POST /signup', async () => {
    const res = await request(app).post('/users/signup').send({
        username: 'test',
        password: 'test',
        email: 'test@gmail.com',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
})