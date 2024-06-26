import * as dotenv from 'dotenv';
import { default as Moralis } from "moralis"
import { BigNumber } from 'bignumber.js';

import { Transaction } from '../db/models';
import { Op } from 'sequelize';

dotenv.config();

const limit = 10;

const getAll = async (req, res, next) => {
    try {
        const { page, type, searchValue } = req.body;
        let filterOptions: any = {};
        if (!!type) {
            filterOptions.type = type
        }
        if (!!searchValue) {
            const numericInput = Number(searchValue);
            filterOptions = {
                ...filterOptions,
                [Op.or]: [
                    {txId: {
                        [Op.iLike]: "%" + searchValue + "%"
                    }},
                    {user: {
                        [Op.iLike]: "%" + searchValue + "%"
                    }}
                ]
            }
            if (numericInput) {
                filterOptions[Op.or] = [
                    ...filterOptions[Op.or],
                    {amount: {
                        [Op.eq]: searchValue
                    }},
                    {tokenId: {
                        [Op.eq]: searchValue
                    }}
                ]
            }
        }
        const transactions = await Transaction.findAll({
            where: filterOptions,
            order: [['updatedAt', 'DESC']],
            limit: limit,
            offset: limit * page - 10
        })
        const totalItems = await Transaction.count(
            {
                where: filterOptions,
            }
        );
        return res.status(200).json({transactions, totalItems})
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
        const { page, type, searchValue } = req.body;
        if (!address) {
            res.status(500).json({ message: "Incorrect Request" })
        }
        
        let filterOptions: any = {
            user: address
        };
        if (!!type) {
            filterOptions.type = type
        }
        if (!!searchValue) {
            const numericInput = Number(searchValue);
            filterOptions = {
                ...filterOptions,
                [Op.or]: [
                    {txId: {
                        [Op.iLike]: "%" + searchValue + "%"
                    }},
                    {user: {
                        [Op.iLike]: "%" + searchValue + "%"
                    }}
                ]
            }
            if (numericInput) {
                filterOptions[Op.or] = [
                    ...filterOptions[Op.or],
                    {amount: {
                        [Op.eq]: numericInput
                    }},
                    {tokenId: {
                        [Op.eq]: numericInput
                    }}
                ]
            }
        }
    
        const user = await Transaction.findAll({
            where: filterOptions,
            order: [['updatedAt', 'DESC']],
            limit: limit,
            offset: limit * page - 10
        })
        const totalItems = await Transaction.count(
            {
                where: filterOptions,
            }
        )
    
        if (!!user) {
            return res.status(200).json({transactions: user, totalItems})
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
