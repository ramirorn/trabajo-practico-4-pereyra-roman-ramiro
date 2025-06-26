//Importaciones
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

//Modelo de los Personajes
export const Character = sequelize.define(
    "Character",
    {
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },

        ki: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
        },

        race: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        gender: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING(90),
        }
    }
);