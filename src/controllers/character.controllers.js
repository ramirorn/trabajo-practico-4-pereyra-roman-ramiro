//Importaciones
import { Character } from "../models/character.model.js"

//Funcion para craer los personajes
export const createCharacter = async (req, res) => {
    //Desestructuracion
    const { name, ki, race, gender, description } = req.body;

    //Quita los espacios a los datos
    if (req.body) {
        for (let value in req.body) {
            if (typeof req.body[value] === "string") {
                req.body[value] = req.body[value].trim();
            }
        }
    }
    try {
        //Validacion para que los datos no esten vacios
        if (name === undefined || name === "") return res.status(400).json({ errormessage: "El nombre no puede estar vacio" })
        if (ki === undefined || ki === "") return res.status(400).json({ errormessage: "El ki no puede estar vacio" })
        if (gender === undefined || gender === "") return res.status(400).json({ errormessage: "El genero no puede estar vacio" })
        if (race === undefined || race === "") return res.status(400).json({ errormessage: "La raza no puede estar vacia" })

        //Validacion de nombre unico
        const nameUnique = await Character.findOne({ where: { name } });
        if (nameUnique) return res.status(400).json({ errormessage: "El nombre del personaje ya existe" })


        //Validacion de ki entero
        const kiInt = Math.floor(ki);
        if (ki !== kiInt) return res.status(400).json({ errormessage: "El ki debe ser un número entero" })


        //Validacion del genero
        if (gender !== "Female" && gender !== "Male") return res.status(400).json({ errormessage: "El genero debe ser 'Female' o 'Male'" });

        //Validacion de la descripcion como cadena de texto/string
        if (description !== undefined) {
            if (typeof description !== "string") return res.status(400).json({ errormessage: "La descripcion debe ser una cadena de texto" });
        }

        //Creacion de los personajes
        const character = await Character.create({ name, ki, race, gender, description });
        res.status(201).json(character);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Funcion para obtener todos los personajes
export const getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.findAll();

        //Error por si no hay personajes en la BD
        if (characters.length === 0) return res.status(404).json({ errormessage: "No hay personajes en la BD" });

        res.json(characters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Funcion para obtener un personaje por id
export const getCharactersByID = async (req, res) => {
    try {
        const character = await Character.findByPk(req.params.id);
        if (character) {
            res.json(character);
        } else {
            res.status(404).json({ message: "Personaje no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Funcion para actualizar un personaje por id
export const updateCharacter = async (req, res) => {
    //desestructuracion
    const { name, ki, race, gender, description } = req.body;
    //Quita los espacios a los datos
    if (req.body) {
        for (let value in req.body) {
            if (typeof req.body[value] === "string") {
                req.body[value] = req.body[value].trim();
            }
        }
    }
    try {
        //Validacion para que los datos no esten vacios

        const personaje = await Character.findByPk(req.params.id);

        if (name === undefined || name === "") personaje.name = personaje.name;
        if (gender === undefined || gender === "") personaje.gender = personaje.gender;
        if (ki === undefined) personaje.ki = personaje.ki;
        if (race === undefined || race === "") personaje.race = personaje.race;
        if (description === undefined || description === "") personaje.description = personaje.description;
        //Validacion de nombre unico
        if (name) {
            const nameUnique = await Character.findOne({ where: { name } });
            if (nameUnique) return res.status(400).json({ errormessage: "El nombre del personaje ya existe" })
        }


        //Validacion de ki entero
        if (ki) {
            const kiInt = Math.floor(ki);
            if (ki !== kiInt) return res.status(400).json({ errormessage: "El ki debe ser un número entero" })
        }



        //Validacion del genero
        if (gender) { if (gender !== "Female" && gender !== "Male") return res.status(400).json({ errormessage: "El genero debe ser 'Female' o 'Male'" }); }


        //Validacion de la descripcion como cadena de texto/string
        if (description !== undefined) {
            if (typeof description !== "string") return res.status(400).json({ errormessage: "La descripcion debe ser una cadena de texto" });
        }

        //Control para saber cuantas filas se vieron afectadas
        const [updated] = await Character.update(req.body, {
            where: { id: req.params.id }
        });
        //Si las filas afectadas son mayores a 0, el personaje se actualizo con exito
        if (updated > 0) return res.status(200).json({ message: "El personaje fue actualizado correctamente" });
        return res.status(404).json({ message: "Personaje no encontrado" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
};

//Funcion para borrar un personaje 
export const deleteCharacter = async (req, res) => {
    try {
        //Borra un persoanje por id
        const deleted = await Character.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: "personaje borrado exitosamente" })
        } else {
            res.status(404).json({ message: "Personaje no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
