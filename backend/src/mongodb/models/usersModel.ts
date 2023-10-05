import { Schema, model } from 'mongoose';
import { IUserDocument, IUserModel } from '../../types/types';
import { generateNonce } from 'siwe';

const UserSchema = new Schema<IUserDocument>(
  {
    name: {type: String},
    lastName: { type: String},
    email: { 
      type: String, 
      unique: true
    },
    phone: {
      type: String,
      unique: true,
      sparse: true
    },
    country: {
      type: String,
      sparse: true
    },
    telegram: { 
      type: String, 
      unique: true
    },
    whatsUp: { 
      type: String, 
      unique: true
    },
    publicKey: {
      type: String,
      unique: true,
      sparse: true
    },
    nonce: {
      type: String,
    },
  },
  { timestamps: true }
);


UserSchema.method("updateNonce", function () {
  return this.nonce = generateNonce()
})
export const UserModel = model<IUserDocument, IUserModel>('User', UserSchema);