import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { ApiError } from '../exceptions/ApiError';


interface tokenPayload {
  id: Types.ObjectId
}

class TokenClass {

  async sign(payload: tokenPayload) {
    const token = jwt.sign(payload, 'verySecretSecret', { expiresIn: '5h' })
    return token
  }
  validate(token: string): any {
    try {
      const decoded = jwt.verify(token, 'verySecretSecret')
      return decoded
    } catch (error) {

      return ApiError.BadRequest(400, 'Invalid token')
    }

  }

}
export const TokenService = new TokenClass()