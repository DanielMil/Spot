import * as Sequelize from 'sequelize';
import { sequelize } from '../index';
import { ParkingLotModel } from './ParkingLot';
import { UserModel } from './User';

export class UserHistoryModel extends Sequelize.Model {
    public id!: number;
    public lot_id!: number;
    public user_id!: number;
    public timestamp_in!: Date;
    public timestamp_out!: Date;
}

export const userHistoryInit = async (): Promise<any> => {
    await UserHistoryModel.init(
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            lot_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: ParkingLotModel,
                    key: 'id',
                },
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: UserModel,
                    key: 'id',
                },
            },
            timestamp_in: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
            },
            timestamp_out: {
                type: Sequelize.DataTypes.DATE,
            },
        },
        {
            tableName: 'user_history',
            sequelize: sequelize,
        },
    );
};
