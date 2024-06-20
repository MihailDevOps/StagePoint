import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface TransactionAttributes {
    id: number;
    tokenId?: number;
    amount: number;
    user: string;
    type: string;
    date: Date;
    txId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface TransactionInput extends Optional<TransactionAttributes, 'id'> { }
export interface TransactionOutput extends Required<TransactionAttributes> { }

class Transaction extends Model<TransactionAttributes, TransactionInput> implements TransactionAttributes {
    public id!: number
    public tokenId?: number;
    public amount: number;
    public user: string;
    public date: Date;
    public type: string;
    public txId: string;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Transaction.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    tokenId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    txId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Transaction;