var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    dni: {type: String, required: true, index: { unique : true}},
    nombre: {type: String, required: true},
    contraseña: {type: String, required: true},
    tipo_carnet: {
        type: String, 
        enum: ["B", "A1", "A2", "A", "C"],
        required: true
    },
    fecha_nacimiento: {type: String, required: true},
    test_realizados: {type: Number},
    correo: {type: String, required: true, index: { unique : true}},
    codigo_postal: {type: Number},
    nacionalidad: {type: String, required: true},
    municipio: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);