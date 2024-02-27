const { response } = require('express');

const esMaestroRole = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere iniciar sesion para hacer esta accion'
        });
    }

    const { role, nombre } = req.usuario;

    if (role !== 'TEACHER_ROLE') {
        return res.status(401).json({
            msg: `${nombre} No tiene acceso porque no es un Maestro`
        });
    };
    next();
}

const esAlumnoRole = (req, resp, next) => {
    if (!req.usuario) {
        return resp.status(500).json({
            msg: 'Se quiere iniciar sesion para hacer esta accion'
        });
    }

    const { role, nombre } = req.usuario;

    if (role !== "STUDEN_ROLE") {
        return resp.status(400).json({
            msg: `${nombre} No tiene acceso porque es un Alumno`
        });
    }
    next();
}

module.exports = {
    esAlumnoRole,
    esMaestroRole
}