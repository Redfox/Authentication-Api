import * as yup from 'yup';

export default yup.object().shape({
  nome: yup.string().required(),
  email: yup
    .string()
    .email('Email no formato errado')
    .required('Informe o email'),
  senha: yup
    .string()
    .min(8, 'Senha deve ter no minimo 8 caracteres')
    .required('Informe a senha'),
  telefones: yup.array().of(
    yup.object().shape({
      ddd: yup.number(),
      numero: yup.number().min(8, 'Numero no formato errado'),
    })
  ),
});
