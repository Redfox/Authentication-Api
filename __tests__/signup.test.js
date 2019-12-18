import request from 'supertest';
import app from '../src/app';

import user from '../src/app/models/User';

const body = {
  nome: 'vitor',
  email: 'vitor1@gmail.com',
  senha: '12345678',
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
};

describe('Cadastro de usuario com sucesso', () => {
  beforeEach(async () => {
    if (await user.countDocuments({})) {
      await user.collection.drop();
    }
  });

  it('Deve cadastrar o usuario e retornar o token de autenticacao', async () => {
    const response = await request(app)
      .post('/signup')
      .send(body)
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });

  it('Deve cadatrar um usuario', async () => {
    const response = await request(app)
      .post('/signup')
      .send(body)
      .expect(200);

    expect(response.body).toHaveProperty(
      'id',
      'nome',
      'email',
      'senha',
      'telefones',
      'data_criacao',
      'data_atualizacao',
      'ultimo_login',
      'token'
    );
  });
});

describe('Cadastro de usuario com falha', () => {
  test('Deve retornar falha na validacao dos dados', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        nome: null,
        email: 'vitor',
        senha: null,
      })
      .expect(400);

    expect(response.body).toHaveProperty('mensagem');
  });
});
