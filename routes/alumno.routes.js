const { Router } = require('express');
const { check } = require('express-validator');
const { existenteEmailAlumno, existenteAlumnoById, existeAlumnoById } = require('../helpers/db-validators.js')
const { validarJWT } = require('../middlewares/validar-jwt.js')
const { validarCampos } = require('../middlewares/validar-campos.js');

const {
    alumnosPost,
    alumnosGet,
    getAlumnoById,
    putAlumnos,
    alumnosDelete
} = require('../controllers/alumno.controller.js');

const router = Router();

router.get("/", alumnosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeAlumnoById),
    ], getAlumnoById
);

router.put(
    "/perfil",
    [
        validarCampos,
        validarJWT,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteAlumnoById)
    ], putAlumnos
);

router.post(
    "/registrarse",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmailAlumno),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("grado", "El grado no puede estar vacio").not().isEmpty(),
        validarCampos,
    ], alumnosPost
);

router.delete(
    "/perfil",
    [
        validarCampos,
        validarJWT,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeAlumnoById),
    ], alumnosDelete
);

module.exports = router;