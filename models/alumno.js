const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role:{
        type: String,
        require: true,
        enum: ["STUDENT_ROLE"]
    },
    grado:{
        type: String,
        require: true
    },
    cursos:{
        type: [String],
        dafault: []
    },
    estado:{
        type: Boolean,
        default: true
    }
});

AlumnoSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...alumno} = this.toObject();
    usuario.aid = _id;
    return alumno;
};

module.exports = model('Alumno', AlumnoSchema);