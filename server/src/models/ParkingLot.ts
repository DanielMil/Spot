import * as Sequelize from 'sequelize';
import { sequelize } from '../index';
import { PassModel } from './Pass';
import { UserModel } from './User';

export class ParkingLotModel extends Sequelize.Model {
    public id!: number;
    public owner_id!: number;
    public max_capacity!: number;
    public curr_capacity!: number;
    public rate!: number;
    public address!: string;
    public allowable_pass_level!: number;
    public pass_id!: number;
}

export const parkingLotInit = async (): Promise<any> => {
    await ParkingLotModel.init(
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            max_capacity: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            curr_capacity: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            allowable_pass_level: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            rate: {
                type: Sequelize.DataTypes.DOUBLE,
                allowNull: false,
            },
            address: {
                type: new Sequelize.DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            owner_id: {
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
            },
        },
        {
            tableName: 'parking_lots',
            sequelize: sequelize,
        },
    );
};
