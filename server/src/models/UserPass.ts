import * as Sequelize from 'sequelize';
import { sequelize } from '../index';
import { PassModel } from './Pass';
import { UserModel } from './User';

export class UserPassesModel extends Sequelize.Model {
    public id!: number;
    public user_id!: number;
    public pass_id!: number;
}

export const userPassesInit = async (): Promise<any> => {
    await UserPassesModel.init(
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: UserModel,
                    key: 'id',
                },
                allowNull: false,
            },
            pass_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: PassModel,
                    key: 'id',
                },
                allowNull: false,
            },
        },
        {
            tableName: 'user_passes',
            sequelize: sequelize,
        },
    );
};
