import Router from "express";
import { createTransaction, getAll, getUserTransactions } from "../controllers/transactionController";
const transactionRouter = Router();

transactionRouter.post('/blockchain-webhook', createTransaction)
transactionRouter.post('/', getAll)
transactionRouter.post('/:address', getUserTransactions)
export default transactionRouter;