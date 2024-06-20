import Router from "express";
import { createTransaction, getAll, getUserTransactions } from "../controllers/transactionController";
const transactionRouter = Router();

transactionRouter.post('/blockchain-webhook', createTransaction)
transactionRouter.get('', getAll)
transactionRouter.get('/:address', getUserTransactions)
export default transactionRouter;