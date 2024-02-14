const { request, response } = require('express');

const esStudentRole = (req = request, resp = response, next) => {
    if(!req.alumno){
        return resp.status(500).json({
            msg: 'Se quiere verificar un role sin validar el token primero'
        });
    }

    const { role, nombre } = req.alumno;

    if( role !== "STUDEN_ROLE"){
        return resp.status(400).json({
            msg: `${nombre} no es un administrador, no puede estar aqui`
        });
    }
    next();
}

module.exports = {
    esStudentRole
}