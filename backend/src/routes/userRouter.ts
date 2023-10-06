import Router from "express";
// import { userController } from "../controllers/userController";
import { authController } from "../controllers/authController";

const userRouter = Router();
userRouter.post('/login', authController.login)
userRouter.post('/verify', authController.verify)
export default userRouter