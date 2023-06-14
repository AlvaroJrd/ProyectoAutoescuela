var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = new Schema({
    numero: {type: Number, required: true},
    numero_preguntas: {type: Number, required: true},
    tipo: {type: String, required: true}
});

module.exports = mongoose.model('Test', TestSchema);