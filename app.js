import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { startDb } from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT;

startDb();
app.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN: http://localhost:${PORT}`)
});

