# Authentication-Api
Api de autenticação com jwt

## Getting Started

```bash
# Instalar pacotes
npm install or yarn install

# criar arquivo .env (não remova o arquivo .env.example)
cp .env.example .env

# configurar o arquivo .env (pode usar qualquer editor)
nano .env

# Iniciar
npm start or yarn start
```

## Tests
```bash
# criar arquivo .env.test
cp .env.example .env.test

# configurar o arquivo .env.test com os dados do banco para realizar os testes
nano .env.test

# Iniciar os testes
npm test or yarn test
```

## Variaveis de ambiente

* MONGODB_URL - Url de conexão com o bando de dados Mongo
* MONGODB_NAME - Nome da base de dados
* MONGODB_USER - Nome de usuario do banco
* MONGODB_PASS - Senha do usuario do banco

## Desenvolvido com

* [NodeJs](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Nodemon](https://nodemon.io/)
* [MongoDB](https://www.mongodb.com/)
* [MongooseJs](https://mongoosejs.com/)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [youch](https://www.npmjs.com/package/youch)
* [yup](https://www.npmjs.com/package/yup)
* [ESLint](https://eslint.org/)
* [Sucrase](https://sucrase.io/)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [Jest](https://jestjs.io/)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/VitorRedfox/Authentication-Api/tags).
