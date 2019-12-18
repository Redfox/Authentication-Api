import request from 'supertest';
import app from '../src/app';

describe('Sucesso ao buscar Usuario', () => {
  it('Deve retornar dados do usuario', async () => {
    const responseUser = await request(app)
      .post('/signup')
      .send({
        nome: 'Vitor',
        email: 'vitor2@gmail.com',
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

describe('Falha ao buscar usuario', () => {
  it('Deve retornar falha na autorizacao', async () => {
    const response = await request(app)
      .get('/user')
      .set('Authorization', `Bearer `)
      .expect(401);

    expect(response.body).toHaveProperty('mensagem');
  });
});
