import { File } from 'buffer';
import { Request } from 'express';
export interface SupportMailReq {
  email: string;
  title: string;
  description: string;
  screenshots: File[];
}
