
const request = require('supertest');
const app = require('./app');

//Test que cet utilisateur existe
it('POST /signin', async () => {
    const res = await request(app).post('/users/signin').send({
      email: 'gringo@gmail.com',
      password: 'A',
    });
   console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect(res.body.token).toBe( 'AJrdD3LbgYExWqbR81vDDCwwF3xc7Qtt');
   });


