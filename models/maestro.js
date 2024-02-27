const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({
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
        require: [true, 'La contraseña es obligatorioa']
    },
    role:{
        type: String,
        default: "TEACHER_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    }
});

MaestroSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...maestro} = this.toObject();
    maestro.uid = _id;
    return maestro;
}

module.exports = model('Maestro', MaestroSchema);