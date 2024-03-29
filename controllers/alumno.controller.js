const bcryptsjs = require('bcryptjs');
const Alumno = require('../models/alumno');
const { response } = require('express');

const alumnosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, alumnos] = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        alumnos
    });
}

const getAlumnoById = async (req, res) => {
    const { id } = req.params;
    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        alumno
    });
}

const putAlumnos = async (req, res = response) => {
    const { id } = req.usuario;
    const { _id, password, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptsjs.genSaltSync();
        resto.password = bcryptsjs.hashSync(password, salt);
    }

    const alumno = await Alumno.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Alumno Actualizado Exitosamente',
        alumno,
    });
}

const alumnosDelete = async (req, res) => {
    const {id} = req.params;
    const alumno = await Alumno.findByIdAndUpdate(id, {estado: false});
    const alumnoAutenticado = req.usuario;

    res.status(200).json({
        msg: 'Alumno a Eliminar',
        alumno,
        alumnoAutenticado
    });
}

const alumnosPost = async (req, res) => {
    const { nombre, correo, password, grado } = req.body;
    const alumno = new Alumno({ nombre , correo, password, grado });

    const salt = bcryptsjs.genSaltSync();
    alumno.password = bcryptsjs.hashSync(password, salt);

    await alumno.save();
    res.status(200).json({
        alumno
    });
}

module.exports = {
    alumnosPost,
    alumnosGet,
    getAlumnoById,
    putAlumnos,
    alumnosDelete
}
