const {Schema, model} = require('mongoose');

const CursoSchema = Schema({
    nombreCurso:{
        type: String,
        require: [true, 'El nombre del curso es un campo obligatorio']
    },
    descripcion:{
        type: String,
        require: [true, 'Agrege una descripcion']
    },
    bimistres:{
        type: Number,
        require: [true, 'Especificar la cantidad de bimestres']
    },
    profesor:{
        type: Schema.Types.ObjectId,
        ref: 'Maestro',
        require: [true, 'El id del profasor es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

CursoSchema.methods.toJSON = function(){
    const{_v, _id, ...curso} = this.toObject();
    curso.uid = _id;
    return curso;
};

module.exports = model('Curso', CursoSchema);