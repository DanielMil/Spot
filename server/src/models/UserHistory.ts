import * as Sequelize from 'sequelize';
import { sequelize } from '../index';
import { ParkingLotModel } from './ParkingLot';
import { UserModel } from './User';

export class UserHistoryModel extends Sequelize.Model {
    public id!: number;
    public lot_id!: number;
    public user_id?: number;
    public timestamp_in!: Date;
    public timestamp_out!: Date;
    public cost!: number;
    public hasPass!: boolean;
    public plate_number!: string;
    public has_left!: boolean;
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
                allowNull: true,
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
            cost: {
                type: Sequelize.DataTypes.DOUBLE,
            },
            hasPass: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
            },
            plate_number: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            has_left: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            tableName: 'user_history',
            sequelize: sequelize,
        },
    );
};
