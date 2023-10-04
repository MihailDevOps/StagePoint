import { Schema, model } from 'mongoose';
import { IUserDocument, IUserModel } from '../../types/types';
import { generateNonce } from 'siwe';

const UserSchema = new Schema<IUserDocument>(
  {
    job: {
      type: String,
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