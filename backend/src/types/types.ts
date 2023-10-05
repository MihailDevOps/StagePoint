import { Document, Model, ObjectId, Types } from 'mongoose';

export interface IUser {
    _id?: string;
    publicKey?: string;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    country?: string;
    telegram?: string;
    whatsUp?: string;
    nonce?: string;
    updateNonce(): string;
}

export type IUserDocument = IUser & Document
export type IUserModel = Model<IUserDocument>