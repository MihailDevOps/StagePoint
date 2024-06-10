import * as dotenv from 'dotenv';
import { Op } from 'sequelize';

import User from '../db/models/User';
import { PoolRecord } from '../db/models';

dotenv.config();


const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({where: {
            address: {
                [Op.ne]: null
            },
            firstName: {
                [Op.ne]: null
            },
            lastName: {
                [Op.ne]: null
            },
        }})
        res.status(200).json({users: users})
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

export {
    getAllUsers,
    getUser,
    getPoolRecords,
    createPoolRecords,
    updatePoolRecord,
    deletePoolRecord
}