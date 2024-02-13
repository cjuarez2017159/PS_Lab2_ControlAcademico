const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos.js');

const {
    alumnosPost,
    alumnosGet,
    getAlumnoById,
    putAlumnos,
    alumnosDelete
} = require('../controllers/alumno.controller.js');

const { existenteEmail, esRoleValido, existenteId } = require('../helpers/db-validators.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.get("/", alumnosGet);