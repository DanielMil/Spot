import * as Sequelize from 'sequelize';
import { sequelize } from '../index';
import { UserModel } from './User';

export class CarModel extends Sequelize.Model {
    public id!: number;
    public user_id!: number;
    public make!: string;
    public model!: string;
    public plate_number!: string;
}

export const carInit = async (): Promise<any> => {
    await CarModel.init(
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            make: {
                type: new Sequelize.DataTypes.STRING(128),
                allowNull: false,
            },
            model: {
                type: new Sequelize.DataTypes.STRING(128),
                allowNull: false,
            },
            plate_number: {
                type: new Sequelize.DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: UserModel,
                    key: 'id',
                },
                allowNull: false,
            }
        },
        {
            tableName: 'cars',
            sequelize: sequelize,
        },
    );
};
