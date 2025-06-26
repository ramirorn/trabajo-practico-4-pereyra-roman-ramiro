// Importaciones
import { Router } from "express";
import {
    createCharacter,
    getAllCharacters,
    getCharactersByID,
    updateCharacter,
    deleteCharacter,
} from "../controllers/character.controllers.js";

//Inicializacion de la instancia Router
const characterRouter = Router();

//Rutas de la API
characterRouter.get("/characters", getAllCharacters);
characterRouter.get("/characters/:id", getCharactersByID);
characterRouter.post("/characters", createCharacter);
characterRouter.put("/characters/:id", updateCharacter);
characterRouter.delete("/characters/:id", deleteCharacter);

//Exportacion por defecto de las rutas
export default characterRouter;