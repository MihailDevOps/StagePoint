import * as dotenv from 'dotenv';
import { NFTPlan } from '../db/models';
dotenv.config();


const getPlans = async (req, res, next) => {
    try {
        const plans = await NFTPlan.findAll()
    
        if (!!plans.length) {
            return res.status(200).json(plans)
        }

        return res.status(200).json(plans)
    } catch (e) {
        return res.status(404).json({'message': e.message})
    }
}

const createPlan = async (req, res, next) => {
    const {
        tokenId,
        price,
        creator,
        startDate,
        endDate,
        depositTerm,
        depositInterest,
        interest,
        rewardsClaimed,
        payOff,
        rewardsAvailable,
        rewardProfit,
        network,
        chainId
    } = req.body;

    await NFTPlan.create({
        tokenId,
        price,
        creator,
        startDate,
        endDate,
        depositTerm,
        depositInterest,
        interest,
        rewardsClaimed,
        payOff,
        rewardsAvailable,
        rewardProfit,
        network,
        chain: chainId
    })
    return res.status(200).end();
}

export {
    createPlan,
    getPlans
}