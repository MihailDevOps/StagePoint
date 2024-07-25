import * as dotenv from 'dotenv';
import { Op } from 'sequelize';

import User from '../db/models/User';
import { ContractInfo, PoolRecord } from '../db/models';

dotenv.config();


const getAllUsers = async (req, res) => {
    try {
        const { page, searchValue } = req.body;
        let filterOptions: any = {
            address: {
                [Op.ne]: null
            },
            firstName: {
                [Op.ne]: null
            },
            lastName: {
                [Op.ne]: null
            },
        };
        if (!!searchValue) {
            filterOptions = {
                ...filterOptions,
                [Op.or]: [
                    {firstName: {
                        [Op.iLike]: "%" + searchValue + "%"
                    }},
                    {lastName: {
                        [Op.iLike]: "%" + searchValue + "%"
                    }},
                    {address: {
                        [Op.iLike]: "%" + searchValue + "%"
                    }},
                    {email: {
                        [Op.iLike]: "%" + searchValue + "%"
                    }}
                ]
            }
        }
        const limit = 10;
        const users = await User.findAll({
        where: filterOptions, 
        order: [['updatedAt', 'DESC']],
        limit: limit,
        offset: limit * page - 10
        })
        const totalItems = await User.count({where: filterOptions})
        res.status(200).json({users: users, totalItems})
    } catch (e) {
        return res.status(500).json({'message': e.message})
    }
}

const getUser = async (req, res) => {
    try {
        const { address } = req.params;
        if (!address) {
            res.status(500).json({ message: "Incorrect Request" })
        }
    
        const user = await User.findOne({where: {address}})
    
        if (!!user) {
            return res.status(200).json(user)
        }
        else {
            return res.status(404).json({message: "User not found"})
        }
    } catch (e) {
        return res.status(500).json({'message': e.message})
    }
}

const getPoolRecords = async (req, res) => {
    try {

        const poolRecords = await PoolRecord.findAll();
    
        if (!!poolRecords) {
            return res.status(200).json(poolRecords)
        }
        else {
            return res.status(200).json([])
        }
    } catch (e) {
        return res.status(500).json({'message': e.message})
    }
}

const createPoolRecords = async (req, res) => {
    try {
        const {name, price, link}  = req.body;
        const poolRecords = await PoolRecord.create({name, price, link});
    
        if (!!poolRecords) {
            return res.status(200).json(poolRecords)
        }
        else {
            return res.status(500).json("Creation error")
        }
    } catch (e) {
        return res.status(500).json({'message': e.message})
    }
}

const updatePoolRecord = async (req, res) => {
    try {
        const {name, price, link, id}  = req.body;
        const poolRecord = await PoolRecord.update({name, price, link}, {where: {id: id}});
    
        if (!!poolRecord) {
            return res.status(200).json(poolRecord)
        }
        else {
            return res.status(500).json("Creation error")
        }
    } catch (e) {
        return res.status(500).json({'message': e.message})
    }
}


const deletePoolRecord = async (req, res) => {
    try {
        const {id}  = req.params;
        // const poolRecord = await PoolRecord.fin({name, price, link}, {where: {id: id}});
    
        // if (!!poolRecord) {
        //     return res.status(200).json(poolRecord)
        // }
        // else {
        //     return res.status(500).json("Creation error")
        // }
    } catch (e) {
        return res.status(500).json({'message': e.message})
    }
}

const getContractBalance = async (req, res) => {
    try {
        const { view } = req.params;
        const viewID = Number(view);

        let dataset: any = [];
        
        let endDate = new Date();
        let startDate = new Date();
        startDate.setDate(endDate.getDate() - viewID + 1);

        const data = await ContractInfo.findAll({where: {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        }});
        
        while (startDate <= endDate) {
            const formattedDate = view > 60 ? `${startDate.getMonth() + 1}.${startDate.getFullYear()}` : startDate.toLocaleDateString().slice(0, 6)
            const obj = {
                value: 0,
                formattedDate
            }
            if (dataset.findIndex((i: any) => i.formattedDate === formattedDate) === -1) {
                dataset.push(obj);
            }
            startDate.setDate(startDate.getDate() + 1);
        };

        for (const item of data) {
            const date = view > 60 ? `${item.createdAt.getMonth() + 1}.${item.createdAt.getFullYear()}` : item.createdAt.toLocaleDateString().slice(0, 6)
            const dayIndex = dataset.findIndex((i: any) => i.formattedDate === date);

            if (!!dataset[dayIndex]) {
                dataset[dayIndex].value = item.balance
            }
        }

        res.status(200).json(dataset);
    } catch (e: any) {
        res.status(500).json({'message': e.message})
    }
}

export {
    getAllUsers,
    getUser,
    getPoolRecords,
    createPoolRecords,
    updatePoolRecord,
    deletePoolRecord,
    getContractBalance
}