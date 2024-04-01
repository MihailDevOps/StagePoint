import Router from "express";
import { getUser, updateUser } from "../controllers/userController";
const userRouter = Router();
userRouter.get('/:address', getUser)
// userRouter.post('', createUser)
userRouter.post('', updateUser)

export default userRouter