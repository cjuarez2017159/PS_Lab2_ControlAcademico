const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos.js');

const {
    maestrosPost,
    maestrosGet,
    getMaestroById,
    putMaestros,
    maestrosDelete
} = require('../controllers/maestro.controller.js');

const { existenteEmail, esRoleValido, existenteId } = require('../helpers/db-validators.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.get("/", maestrosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], getMaestroById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        check('role').custom(esRoleValido),
        validarCampos
    ], putMaestros
);

route.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos
    ], maestrosPost
);

router.delete(
    "/:id",
    [
        validarJWT,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], maestrosDelete
);

module.exports = router;