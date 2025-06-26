// Importaciones
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { startDb } from "./src/config/database.js";
import characterRouter from "./src/routes/characters.routes.js";

// Definicion de variables
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/characters", characterRouter);

// Inicio del servidor y conexion con la base de datos
app.listen(PORT, async () => {
    await startDb();
    console.log(`SERVIDOR CORRIENDO EN: http://localhost:${PORT}/characters`)
});

