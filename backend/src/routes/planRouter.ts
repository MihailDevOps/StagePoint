import Router from "express";
import { createPlan, getPlans } from "../controllers/planController";
const planRouter = Router();

planRouter.post('', createPlan)
planRouter.get('', getPlans)
export default planRouter;