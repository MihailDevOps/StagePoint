import * as dotenv from 'dotenv';
import { default as Moralis } from "moralis"
import { BigNumber } from 'bignumber.js';

import { Transaction } from '../db/models';

dotenv.config();


const getAll = async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll()
        return res.status(200).json(transactions)
    } catch (e) {
        return res.status(404).json({'message': e.message})
    }
}

const createTransaction = async (req, res, next) => {
    if (!!req.body.logs.length) {
        const txId = req.body.logs[0].transactionHash;
        const transaction = await Transaction.findOne({where: {txId}})

        if (!transaction) {
            interface transactionEvent {
                action: string,
                user: string,
                amount: BigNumber,
                date: BigNumber,
                tokenId: BigNumber
            }
            const log = Moralis.Streams.parsedLogs(req.body)[0] as transactionEvent;
            try {
                const txDate = new Date(log.date.toNumber() * 1000);
                    await Transaction.create({
                        txId: txId,
                        type: log.action,
                        user: log.user,
                        amount: log.amount.toNumber(),
                        date: txDate,
                        tokenId: log.tokenId.toNumber() > 0 ? log.tokenId.toNumber() : null
                    })
            } catch (e) {
                console.log("Error")
                console.log(e.message)
            }
        }
    }
    return res.status(200).end();
}

const getUserTransactions = async (req, res, next) => {
    try {
        const { address } = req.params;
        if (!address) {
            res.status(500).json({ message: "Incorrect Request" })
        }
    
        const user = await Transaction.findAll({where: {user: address}})
    
        if (!!user) {
            return res.status(200).json(user)
        }
        else {
            return res.status(404).json({message: "Not found"})
        }
    } catch (e) {
        return res.status(404).json({'message': e.message})
    }
}


export {
    createTransaction,
    getAll,
    getUserTransactions
}
