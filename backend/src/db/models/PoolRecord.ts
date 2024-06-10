import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface PoolRecordAttributes {
    id: number;
    name: string;
    price: number;
    link: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface PoolRecordInput extends Optional<PoolRecordAttributes, 'id'> { }
export interface PoolRecordOutput extends Required<PoolRecordAttributes> { }

class PoolRecord extends Model<PoolRecordAttributes, PoolRecordInput> implements PoolRecordAttributes {
    public id!: number
    public name!: string;
    public price!: number;
    public link!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

PoolRecord.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default PoolRecord;