import { DataTypes, Model, Optional, Sequelize } from 'sequelize'
import sequelizeConnection from '../config'

interface ContractInfoAttributes {
    id: number;
    balance: number;
    createdAt: Date;
}
export interface ContractInfoInput extends Optional<ContractInfoAttributes, 'id'> { }
export interface ContractInfoOutput extends Required<ContractInfoAttributes> { }

class ContractInfo extends Model<ContractInfoAttributes, ContractInfoInput> implements ContractInfoAttributes {
    public id!: number
    public balance!: number;
    // timestamps!
    public createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

ContractInfo.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default ContractInfo;