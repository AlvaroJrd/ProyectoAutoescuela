var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Test = require('./Test.js');

var PreguntaSchema = new Schema({
    texto: {type: String, required: true},
    respuesta1: {type: String, required: true},
    respuesta2: {type: String, required: true},
    respuesta3: {type: String, required: true},
    respuesta4: {type: String, required: true},
    correcta: {
        type: String, 
        enum: ["A", "B", "C", "D"],
        required: true
    },
    tipo: {type: String, required: true},
    dificultad: {type: String, required: true},
    test: {
        type: Schema.ObjectId,
        ref: 'Test'
      }
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);