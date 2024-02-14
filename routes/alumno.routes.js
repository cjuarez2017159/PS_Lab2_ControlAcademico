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

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], getAlumnoById 
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        check('role').custom(esRoleValido),
        validarCampos
    ], putAlumnos
);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("grado", "El grado no puede estar vacio").not().isEmpty(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], alumnosPost
);

router.delete(
    "/:id",
    [
        validarJWT,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], alumnosDelete
);

module.exports = router;