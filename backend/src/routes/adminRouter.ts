import Router from "express";
import { getAllUsers, getPoolRecords, getUser, createPoolRecords, updatePoolRecord, deletePoolRecord } from "../controllers/adminController";

const adminRouter = Router();
adminRouter.post('/users', getAllUsers)
adminRouter.get('/user/:address', getUser)
adminRouter.get('/pool-records', getPoolRecords)
adminRouter.post('/pool-records', createPoolRecords)
adminRouter.put('/pool-records', updatePoolRecord)
adminRouter.delete('/pool-records/:id', deletePoolRecord)

export default adminRouter