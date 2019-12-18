/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    ultimo_login: {
      type: Date,
      required: true,
    },
    telefones: [
      {
        ddd: Number,
        numero: Number,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.sanitize = function(token) {
  const user = this.toObject();

  return {
    id: user._id,
    nome: user.nome,
    email: user.email,
    telefones: user.telefones.forEach(telefone => delete telefone._id),
    data_criacao: user.createdAt,
    data_atualizacao: user.updatedAt,
    token,
  };
};

export default model('User', UserSchema);
