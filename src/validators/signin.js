import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .email('Email no formato errado')
    .required('Informe o email'),
  senha: yup.string().required('Informe a senha'),
});
