// Importaciones
import { Router} from "express";
import {
    createCharacter,
    getAllCharacters,
    getCharactersByID,
    updateCharacter,
    deleteCharacter,
} from "../controllers/character.controllers.js";

const characterRouter = Router();

characterRouter.get("/", getAllCharacters);
characterRouter.get("/:id", getCharactersByID);
characterRouter.post("/", createCharacter);
characterRouter.put("/:id", updateCharacter);
characterRouter.delete("/:id", deleteCharacter);

export default characterRouter;