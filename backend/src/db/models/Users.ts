import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface UserAttributes {
    id: number;
    firstName?: string;
    lastName?: string;
    address: string;
    email?: string;
    phone?: string;
    country?: string;
    telegram?: string;
    whatsApp?: string;
    telegramNotifications?: boolean;
    whatsAppNotifications?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface IngredientOuput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public firstName?: string;
    public lastName?: string;
    public address!: string;
    public email?: string;
    public phone?: string;
    public country?: string;
    public telegram?: string;
    public whatsApp?: string;
    public telegramNotifications?: boolean;
    public whatsAppNotifications?: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telegram: {
        type: DataTypes.STRING,
        allowNull: true
    },
    whatsApp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telegramNotifications: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    whatsAppNotifications: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default User