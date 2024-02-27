const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');

const existenteEmailAlumno = async (correo = '') => {
    const existeEmail = await Alumno.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existenteEmailMaestro = async (correo = '') => {
    const existeEmail = await Maestro.findOne({correo});
    if(existeEmail){
        throw new Error(`el correo ${ correo } ya esta registrado`);
    }
}

const existeAlumnoById = async (id = '') => {
    const existeUsuario = await Alumno.findOne({id});
    if(existeUsuario){
        throw new Error(`El alumno con el ${ id } no existe`);
    }
}

const existeMaestroById = async (id = '') => {
    const existeUsuario = await Maestro.findOne({id});
    if(existeUsuario){
        throw new Error(`El profesor con el ${ id } no existe`);
    }
}

module.exports = {
    existenteEmailAlumno,
    existenteEmailMaestro,
    existeAlumnoById,
    existeMaestroById
}