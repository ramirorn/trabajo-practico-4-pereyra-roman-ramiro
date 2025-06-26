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
characterRouter.get("/", getAllCharacters);
characterRouter.get("/:id", getCharactersByID);
characterRouter.post("/", createCharacter);
characterRouter.put("/:id", updateCharacter);
characterRouter.delete("/:id", deleteCharacter);

//Exportacion por defecto de las rutas
export default characterRouter;