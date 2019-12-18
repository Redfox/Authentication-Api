import request from 'supertest';
import app from '../src/app';

describe('Cadastro de um usuario', () => {
  it('Deve cadastrar o usuario e retornar o token de autenticacao', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        nome: 'vitor',
        email: 'vitor@gmail.com',
        senha: '123',
        telefones: [
          {
            ddd: 11,
            numero: 961878675,
          },
          {
            ddd: 11,
            numero: 964579563,
          },
        ],
      });

    expect(response.body).toHaveProperty('token');
  });
});
