const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/login',
    [
        check('correo', "Este no es un correo valido").isEmail(),
        check('password', "El password es obligatorio").not().isEmpty(),
        validarCampos
    ], login
);

module.exports = router;