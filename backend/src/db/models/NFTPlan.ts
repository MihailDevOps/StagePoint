import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface NFTPlanAttributes {
    id: number;
    tokenId: number;
    price: number;
    creator: string;
    startDate: Date;
    endDate: Date;
    depositTerm: number;
    depositInterest: number;
    interest: number;
    rewardsClaimed: number;
    payOff: number;
    rewardsAvailable: number;
    rewardProfit: number;
    network: string;
    chain: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface NFTPlanInput extends Optional<NFTPlanAttributes, 'id'> { }
export interface NFTPlanOutput extends Required<NFTPlanAttributes> { }

class NFTPlan extends Model<NFTPlanAttributes, NFTPlanInput> implements NFTPlanAttributes {
    public id!: number
    public tokenId: number;
    public price: number;
    public creator: string;
    public startDate: Date;
    public endDate: Date;
    public depositTerm: number;
    public depositInterest: number;
    public interest: number;
    public rewardsClaimed: number;
    public payOff: number;
    public rewardsAvailable: number;
    public rewardProfit: number;
    public network: string;
    public chain: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

NFTPlan.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    tokenId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    depositTerm: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    depositInterest: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    interest: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rewardsClaimed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payOff: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rewardsAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rewardProfit: {
        type: DataTypes.FLOAT ,
        allowNull: false,
    },
    network: {
        type: DataTypes.STRING ,
        allowNull: false,
    },
    chain: {
        type: DataTypes.INTEGER ,
        allowNull: true,
    },
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default NFTPlan