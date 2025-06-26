//Importaciones
import { Sequelize } from "sequelize";
import "dotenv/config";

//Conexion con la base de datos
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB,
        dialect: process.env.DB_DIALECT
    },
);

//Testeo de la conexion
export const startDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexion exitosa con la base de datos");
        await sequelize.sync();
    } catch (error) {
        console.log("Error en la conexion con la base de datos", error)
    }
};