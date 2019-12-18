import request from 'supertest';
import app from '../src/app';

const user = {
  nome: 'vitor',
  email: 'vitor@gmail.com',
  senha: '12345678',
  telefones: [{ ddd: 11, numero: 961878675 }],
};

describe('SignIn do usuario com sucesso', () => {
  beforeEach(async () => {
    await request(app)
      .post('/signup')
      .send(user);
  });

  test('Deve autenticar usuario e retornar token', async () => {
    const response = await request(app)
      .post('/signin')
      .send({ email: user.email, senha: user.senha })
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });
});

describe('SignIn do usuario com falha', () => {
  test('Deve retornar falha na autorizacao', async () => {
    const response = await request(app)
      .post('/signin')
      .send({ email: 'email@incorreto.com', senha: 'Incorreta' })
      .expect(401);

    expect(response.body).toHaveProperty('mensagem');
  });

  test('Deve  retornar falha nas validacoes dos dados', async () => {
    const response = await request(app)
      .post('/signin')
      .send({ email: 'vitor', senha: '123' })
      .expect(400);

    expect(response.body).toHaveProperty('mensagem');
  });
});
