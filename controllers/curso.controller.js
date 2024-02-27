const Curso = require('../models/curso');
const Alumno = require('../models/alumno');
const { response } = require('express');

const cursosGet = async (req, res = response) => {
    const {limite, desde} = req.params;
    const query = {estado: true};

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
}

const cursoGetId = async (req, res) =>{
    const {id} = req.params;
    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        curso
    })
}

const cursosPorAlumno = async(req, res) =>{
    try {
        const alumnoId = req.usuario._id;
        const alumnoCursos = await Alumno.findById(alumnoId).populate('cursos');

        const cursosActivos = alumnoCursos.cursos.filter(curso => curso.estado === true);

        res.status(200).json({ misCursos: cursosActivos});
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Error al obtener los cursos del alumno'});
    }
};

const asignacionAlumno = async(req, res) => {
    try {
        const { cursoId } = req.body;
        const alumnoId = req.usuario._id;

        const alumno = await Alumno.findById(alumnoId);

        alumno.curso.push(cursoId);
        await alumno.save();

        console.log('oa'+alumnoId);
        res.status(200).json({
            msg: 'Curso agregado al alumno correctamente',
            alumno
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({msg: 'Error al agregar el curso al alumno'});
    }
};

const cursosPorMaestro = async (req, res) => {
    try {
        const {_id, nombre} = req.usuario;
        const query = {maestro: _id, estado: true};

        const cursos = await Promise.all([
            Curso.find(query)
        ]);
        res.status(200).json({
            msg: `Cursos de ${nombre}`,
            cursos
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Error al obtener los cursos del usuario' });
    }
};

const cursoDelete = async (req, res) => {
    const {_id, nombre} = req.usuario;
    const {id} = req.params;

    const curso = await Curso.findOneAndUpdate(
        { _id: id, maestro: _id },
        { estado: false },
    );

    if (!curso){
        return res.status(404).json({ msg: 'Usted no tiene autorizacion de eliminar este curso.'});
    }

    res.status(200).json({
        msg: `Curso eliminado exitosamente por ${nombre}`,
        curso
    });
};

const cursoPut = async (req, res = response) => {
    const {_id: _idUsuario, nombre} = req.usuario;
    const {id} = req.params;
    const {_id: _idCurso, ...resto} = req.body;

    const curso = await Curso.findById(id);

    const idUsuarioString = _idUsuario.toString();
    const idMaestroString = curso.maestro._id.toString();

    if(idUsuarioString !== idMaestroString) {
        return res.status(400).json({ msg: 'Usted no tiene permisos para actualizar este curso.'});
    }
    
    const cursoActualizado = await Curso.findOneAndUpdate(
        id,
        resto
    );

    res.status(200).json({
        msg: `Curso actualizado exitosamente por ${nombre}`,
        curso
    });
}

const cursoPost = async(req, res) => {
    const {_id} = req.usuario;

    const {nombreCurso, descripcion, bimestres} = req.body;
    const curso = new Curso({nombreCurso, descripcion, bimestres, maestro: _id});

    await curso.save();
    res.status(202).json({
        curos
    });
}

module.exports = {
    cursoPost,
    cursosGet,
    cursoGetId,
    cursoDelete,
    cursoPut,
    cursosPorAlumno,
    asignacionAlumno,
    cursosPorMaestro
}