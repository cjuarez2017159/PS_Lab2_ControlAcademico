const jwt = require('jsonwebtoken');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');
const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            smg: 'No hay token en la peticion',
        });
    }
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const alumno = await Alumno.findById(uid);
        if(!alumno){
            return res.status(401).json({
                smg: 'Alumno no existe en la DB'
            });
        }

        if(!alumno.estado){
            return res.status(401).json({
                msg: 'Token no valido, Alumno con estado false'
            });
        };

        req.alumno = alumno;
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