import { NextFunction, Request, Response } from 'express';
import { SiweMessage } from 'siwe';
import { ApiError } from '../exceptions/ApiError';
import { TokenService } from '../services/tokenService';
import { AuthenticatedRequest,LoginWeb3ReqType,VerifWeb3ReqType } from '../types/reqTypes';
import { UserService } from './../services/userService';
import { UserModel } from '../mongodb/models/usersModel';
class authControllerClass {
  async login(req: Request<{}, {}, LoginWeb3ReqType>, res: Response, next: NextFunction) {
    console.log(req.body)
    const { publicKey } = req.body
    if (!publicKey) {
      return next(ApiError.BadRequest(404, 'Provide publicKey'))
    }
    const candidate = await UserModel.findOne({publicKey});
    if (!candidate) {
      const user = await UserService.create({ publicKey })
      const token = await TokenService.sign({ id: user._id })
      return res.status(200).json({
        status: 'success',
        token,
        data: {
          punlicKey: user.publicKey,
          nonce: user.nonce
        }
      })
    }
    const token = TokenService.sign({ id: candidate._id })
    candidate.updateNonce()
    return res.status(200).json({
      status: 'success',
      token,
      data: {
        punlicKey: candidate.publicKey,
        nonce: candidate.nonce
      }
    })
  }
  async verify(req: Request<{}, {}, VerifWeb3ReqType>, res: Response, next: NextFunction) {
    const { message, signature } = req.body;
    if (!message || !signature) {
      return next(new ApiError(404, 'Message or signature not provided'))
    }
    const messageObj = JSON.parse(message)
    const siweMessage = new SiweMessage(messageObj);
    try {
      const isVerified = await siweMessage.verify({ signature, nonce: messageObj.nonce })
      const user = await UserService.getOne({ publicKey: isVerified.data.address })
      const token = await TokenService.sign({ id: user._id })
      console.log(user)
      return res.status(200).json({
        status: 'success',
        token,
        data: {
          user
        }
      })
    } catch (error) {
      return next(ApiError.BadRequest(400, 'Truoble with verification message'))
    }
  }
  async protect(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    let token: string;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(ApiError.UnauthorizedErorr())
    }
    const decoded = TokenService.validate(token)
    const currentUser = await UserService.getOne({ _id: decoded.id })
    if (currentUser) {
      return next(ApiError.BadRequest(401, 'The user belonging to this token does no longer exist'))
    }
    req.user = currentUser;
    next()
  }
}

export const authController = new authControllerClass()