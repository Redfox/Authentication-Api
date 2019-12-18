/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

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

UserSchema.pre('save', async function(next) {
  if (this.senha) {
    this.senha = await bcrypt.hash(this.senha, 8);
  }

  next();
});

export default model('User', UserSchema);
