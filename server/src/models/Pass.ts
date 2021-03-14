import * as Sequelize from 'sequelize';
import { sequelize } from '../index';
import { ParkingLotModel } from './ParkingLot';

export class PassModel extends Sequelize.Model {
    public id!: number;
    public price!: number;
    public clearance_level!: number;
    public num_available!: number;
    public num_purchased!: number;
    public expiration!: Date;
    public acquisition!: Date;
    public name!: string;
}

export const passInit = async (): Promise<any> => {
    await PassModel.init(
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            price: {
                type: Sequelize.DataTypes.DOUBLE,
                allowNull: false,
            },
            clearance_level: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            num_available: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            num_purchased: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            expiration: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
            },
            acquisition: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'passes',
            sequelize: sequelize,
        },
    );
};
