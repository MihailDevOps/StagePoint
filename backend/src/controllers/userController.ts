import { Client } from 'pg'
import * as dotenv from 'dotenv';
import User from '../db/models/Users';
dotenv.config();



const getUser = async (req, res, next) => {
    try {
        const { address } = req.params;
        if (!address) {
            res.status(500).json({ message: "Incorrect Request" })
        }
        const select =
            `SELECT * FROM users WHERE address=$1`;
        // const values = [address, firstName, lastName, email, phone, country, telegram, whatsApp, telegramNotifications, whatsAppNotifications]
    
        const user = await User.findOne({where: {address}})
    
        if (!!user) {
            return res.status(200).json(user)
        }
        else {
            const newUser = await User.create({address})
            return res.status(200).json(newUser)
        }
    } catch (e) {
        return res.status(404).json({'message': e.message})
    }
}

const updateUser = async (req, res, next) => {
    const { firstName, lastName, address, email, phone, country, telegram, whatsApp, telegramNotifications, whatsAppNotifications } = req.body;

    const user = await User.findOne({where: {address}})

    if (!user) {
        const newUser = await User.create({firstName, lastName, address, email, phone, country, telegram, whatsApp, telegramNotifications, whatsAppNotifications})
        return res.status(200).json(newUser)
    } else {
        const updateUser = await User.update({firstName, lastName, address, email, phone, country, telegram, whatsApp, telegramNotifications, whatsAppNotifications}, {where: {address}})
        return res.status(200).json(updateUser)
    }
}

export {
    getUser,
    updateUser
}