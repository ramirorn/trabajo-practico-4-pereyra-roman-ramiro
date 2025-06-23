import { Character } from "../models/character.model"

export const createCharacter = async (req, res) =>{
    try {
        const character = await Character.create(req.body);
        res.status(201).json(character);
    } catch (err) {
        res.status(500).json( { error: err.message });
    }
};

export const getAllCharacters = async (req, res) =>{
    try {
        const characters = await Character.findAll();
        res.json(characters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCharactersByID = async (req, res) =>{
    try {
        const character = await Character.findByPk(req.params.id);
        if (character) { res.json(character);
        } else { res.status(404).json({message: "Personaje no encontrado"});
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateCharacter = async (req, res) =>{
    try {
        const [actualizado] = await Character.update(req.body, {
            where: { id: req.params.id }
        });
        if (actualizado) {
            const characterUpdated = await Character.findByPk(req.params.id);
            res.json(characterUpdated);
        } else {
            res.status(404).json( {message: "Personaje no encontrado" } );
        }
    } catch (err) {
        res.status(500),json( { error: err.message } )
    }
};

export const deleteCharacter = async (req, res) =>{
    try {
        const deleted = await Character.destroy({ where: {id: req.params.id }});
        if (deleted) {
            res.json( {message: "personaje borrado exitosamente"})
        } else {
            res.status(404).json({ message: "Personaje no encontrado"} );
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};