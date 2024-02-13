const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatorioa']
    },
    role:{
        type: String,
        default: ["TEACHER_ROLE"]
    },
    cursos:{
        type: String,
        require: true
    },
    estado:{
        type: Boolean,
        defautl: true
    }
});

MaestroSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...maestro} = this.toObject();
    maestro.mid = _id;
    return maestro;
}