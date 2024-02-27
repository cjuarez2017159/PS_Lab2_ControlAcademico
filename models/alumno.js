const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },
    role:{
        type: String,
        default: "STUDENT_ROLE"
    },
    grado:{
        type: String,
        require: [true, "El grado es obligatorio"]
    },
    cursos:{
        type: [String],
        ref: 'Curso',
        dafault: []
    },
    estado:{
        type: Boolean,
        default: true
    }
});

AlumnoSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
};

module.exports = model('Alumno', AlumnoSchema);