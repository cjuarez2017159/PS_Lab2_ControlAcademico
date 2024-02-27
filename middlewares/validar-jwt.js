const jwt = require('jsonwebtoken');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');
const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next) => {
    let token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            smg: 'No hay token en la peticion',
        });
    }
    try{
        let { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        let usuario = await Alumno.findById(uid);

        if(!usuario){
            usuario = await Maestro.findById(uid);

            if(!usuario){
                return res.status(401).json({
                    msg: 'Usuario no existe en la base de datos'
                });
            }
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido, Usuario con estado false'
            });
        };

        req.usuario = usuario;
        next();

    }catch(e){
        console.log(e);
        res.status(401).json({
            smg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}