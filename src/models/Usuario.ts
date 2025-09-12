import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { types } from "util";

export interface UsuarioAttributes {
    id?: number,
    nome: string,
    email: string,
    senha: string
}

export class Usuario extends Model<UsuarioAttributes> implements UsuarioAttributes {
    
    public id!: number | undefined;
    public nome!: string;
    public email!: string;
    public senha!: string;
}

Usuario.init ({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuario'
});