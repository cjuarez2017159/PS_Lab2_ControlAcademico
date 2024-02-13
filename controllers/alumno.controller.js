const bcryptsjs = require('bcryptjs');
const Usuario = require('../models/alumno');
const { response , request } = require('express');

const alumnosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.contDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

const getAlumnoById = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json({
        usuario
    });
}

const putAlumnos = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptsjs.genSaltSync();
        resto.password = bcryptsjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Usuario Actualizado Exitosamente',
        usuario,
    });
}

const alumnosDelete = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        msg: 'Usuario a Eliminar',
        usuario,
        usuarioAutenticado
    });
}

const alumnosPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre , correo, password, role });

    const salt = bcryptsjs.genSaltSync();
    usuario.password = bcryptsjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

module.exports = {
    alumnosPost,
    alumnosGet,
    getAlumnoById,
    putAlumnos,
    alumnosDelete
}