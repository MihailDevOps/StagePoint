import Router from "express";
import { getUser, login, updateUser } from "../controllers/userController";
const userRouter = Router();
userRouter.get('/:address', getUser)
userRouter.post("/login", login)
userRouter.post('', updateUser)

export default userRouter