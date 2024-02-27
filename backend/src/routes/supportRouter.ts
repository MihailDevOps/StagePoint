import Router from "express";
import { supportController } from "../controllers/supportController";
const supportRouter = Router();
supportRouter.post('/sendMessage', supportController.sendMessage)
export default supportRouter