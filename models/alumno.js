const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
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
    img:{
        type: String
    },
    role:{
        type: String,
        require: true,
        enum: ["STUDENT_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        dafault: false
    }
});

AlumnoSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...alumno} = this.toObject();
    usuario.aid = _id;
    return alumno;
};

module.exports = model('Alumno', AlumnoSchema);