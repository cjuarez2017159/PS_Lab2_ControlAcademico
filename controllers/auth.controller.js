const { request, response } = require('express');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    let { correo, password } = req.body;

    try {
        let usuario = await Alumno.findOne({ correo });
        if (!usuario) {
            usuario = await Maestro.findOne({ correo });
            if (!usuario) {
                return res.status(400).json({
                    msg: "Credenciales incorrectas, correo no existe en la DB."
                });
            };
        };

        if (usuario.estado === false) {
            return res.status(400).json({
                msg: "El correo no existe en la DB"
            });
        };

        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta."
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: "Bienvenido",
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el Administrador"
        });
    };
};

module.exports = {
    login
}