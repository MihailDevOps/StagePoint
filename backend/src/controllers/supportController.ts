import { NextFunction, Request, Response } from 'express';
import { SupportMailReq } from '../types/reqTypes';
import mailService from '../services/mailService';
import { ApiError } from '../exceptions/ApiError';

class supportControllerClass {
    async sendMessage(req, res: Response, next: NextFunction) {
        const { email, title, description, address } = req.fields
        const filesArray = Object.values(req.files);
        if (!email || !title || !description){
            return res.status(500).json({ 
                status: 'email or title or description not provided', 
            })
        }
        console.log(req.body)
        return res.status(200).json({ 
            status: 'message sended',
            data: await mailService.send(email, title, description, filesArray, address) 
        })
    }
}

export const supportController = new supportControllerClass()