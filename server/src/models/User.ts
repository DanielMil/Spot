import * as Sequelize from 'sequelize';
import { sequelize } from '../index';

export class UserModel extends Sequelize.Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password?: string;
    public isOwner!: boolean;
    public resetPasswordToken!: string | undefined;
    public resetPasswordExpiration!: Date | undefined;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const userInit = async (): Promise<any> => {
    await UserModel.init(
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: new Sequelize.DataTypes.STRING(128),
                allowNull: false,
            },
            lastName: {
                type: new Sequelize.DataTypes.STRING(128),
                allowNull: false,
            },
            email: {
                type: new Sequelize.DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            password: {
                type: new Sequelize.DataTypes.STRING(128),
                allowNull: false,
            },
            isOwner: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
            },
            resetPasswordToken: {
                type: new Sequelize.DataTypes.STRING(128),
                allowNull: true,
            },
            resetPasswordExpiration: {
                type: new Sequelize.DataTypes.DATE(),
                allowNull: true,
            },
        },
        {
            tableName: 'users',
            sequelize: sequelize,
        },
    );
};
