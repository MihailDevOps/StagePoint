import { Document, Model, ObjectId, Types } from 'mongoose';

export interface IUser {
    _id?: string;
    publicKey?: string;
    job?: string;
    phone?: string;
    country?: string;
    nonce?: string;
    updateNonce(): string;
}

export type IUserDocument = IUser & Document
export type IUserModel = Model<IUserDocument>