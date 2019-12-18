import request from 'supertest';
import app from '../src/app';

describe('Sucesso ao buscar Usuario', async () => {
  test('Deve retornar dados do usuario', async () => {
    const responseUser = await request(app)
      .post('/sign-up')
      .send({
        nome: 'Vitor',
        email: 'vitor@gmail.com',
        senha: '12345678',
        telefones: [{ ddd: 11, numero: 961878675 }],
      });

    const { token } = responseUser.body;

    const response = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('id');
  });
});
