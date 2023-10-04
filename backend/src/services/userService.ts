import { generateNonce } from "siwe";
import { UserModel } from "../mongodb/models/usersModel";



interface createProps {
  publicKey?: string,
  nonce?: string,
}
class UserServiceClass {
  async create(web3: createProps) {
    const { publicKey } = web3
    const nonce = generateNonce()
    const newUser = await UserModel.create({ publicKey, nonce, isWeb3Activated: true })
    return newUser
  }
  async getOne(query: any, options?: { showPass: boolean }) {
    if (options) {
      if (options!.showPass) {
        return await UserModel.findOne(query).select('+password')
      }
    }
    return await UserModel.findOne(query)
  }

}

export const UserService = new UserServiceClass()