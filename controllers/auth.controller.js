const { request } = require('express');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        const alumno = await Alumno.findOne({correo});
        const maestro = await Maestro.findOne({correo});

        if(!alumno){
            return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existe en la DB."
            });
        }

        if(!alumno.estado){
            return res.status(400).json({
                msg: "El alumno no existe en la DB"
            });
        };

        if(!maestro){
            return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existente en la DB."
            });
        }

        if(!maestro.estado){
            return res.status(400).json({
                msg: "El maestro no existe en la DB"
            });
        };
        
        const validarPassword = bcryptjs.compareSync(password, alumno.password, maestro.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta."
            });
        };

        const token = await generarJWT(alumno.id, maestro.id);

        res.status(200).json({
            msg: "Bienvenido",
            alumno,
            maestro,
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