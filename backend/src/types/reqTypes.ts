import { IUser } from "./types";
import { Request } from 'express';
export interface RegistrationReqType {
  email: string;
  password: string;
}

export interface LoginWeb3ReqType {
  publicKey: string;
}
export interface VerifWeb3ReqType {
  message: string;
  signature: string;
}
export interface AuthenticatedRequest extends Request {
  user: IUser;
}