const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { validarCampos } = require('../middlewares/validar-campos.js');

const {
    maestrosPost,
    maestrosGet,
    getMaestroById,
    putMaestros,
    maestrosDelete
} = require('../controllers/maestro.controller.js');

const { existeMaestroById, existenteEmailMaestro } = require('../helpers/db-validators.js');

const router = Router();

router.get("/", maestrosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMaestroById),
        validarCampos
    ], getMaestroById
);

router.put(
    "/:id",
    [
        validarJWT,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMaestroById),
        validarCampos
    ], putMaestros
);

router.post(
    "/registrarse",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmailMaestro),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6}),
        validarCampos
    ], maestrosPost
);

router.delete(
    "/perfil",
    [
        validarJWT,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMaestroById),
        validarCampos
    ], maestrosDelete
);

module.exports = router;