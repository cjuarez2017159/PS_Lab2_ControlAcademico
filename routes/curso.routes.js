const {Router} = require('express');
const {check} = require('express-validator');

const {esAlumnoRole, esMaestroRole} = require('../middlewares/validar-roles');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos, validarCursos} = require('../middlewares/validar-campos');

const {
    cursoPost,
    cursosGet,
    cursoDelete,
    cursoPut,
    cursosPorMaestro,
    cursosPorAlumno,
    asignacionAlumno,
} = require('../controllers/curso.controller');

const router = Router();

router.get('/', cursosGet);
router.get('/administrar', validarJWT, esMaestroRole, cursosPorMaestro);
router.get('/misCursos', validarJWT, esAlumnoRole, cursosPorAlumno);

router.post(
    '/administrar',
    [
        validarCampos,
        validarJWT,
        esMaestroRole,
        check('nombreCurso', "Especificar el nombre del curso").not().isEmpty(),
        check('descripcion', 'Agregue una descripcion').not().isEmpty(),
        check('bimestres', 'Especificar el numero de bimestres').not().isEmpty()
    ], cursoPost
);

router.delete(
    '/administrar/:id',
    [
        validarCampos,
        validarJWT,
        esMaestroRole,
        check('id', 'No es un id valido').isMongoId(),
    ], cursoDelete
);

router.put(
    '/administrar/:id',
    [
        validarCampos,
        validarJWT,
        esMaestroRole,
        check('id', 'No es un id valido').isMongoId()
    ], cursoPut
);

router.post(
    '/misCursos',
    [
        validarJWT,
        esAlumnoRole,
        validarCursos,
        check('cursoId').notEmpty(),
        validarCampos
    ], asignacionAlumno
);

module.exports = router;