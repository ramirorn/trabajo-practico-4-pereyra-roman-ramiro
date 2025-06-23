// Importaciones
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { startDb } from "./src/config/database.js";

// Definicion de variables
const app = express();
const PORT = process.env.PORT;

// Conexion con la base de datos
startDb();

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN: http://localhost:${PORT}`)
});

