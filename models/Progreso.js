var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User.js');
var Test = require('./Test.js');

var ProgresoSchema = new Schema({
    dni: {
        type: Schema.ObjectId,
        ref: 'User'
      },
      test: {
        type: Schema.ObjectId,
        ref: 'Test'
      },
    numero_fallos: {type: Number, required: true}
});

module.exports = mongoose.model('Progreso', ProgresoSchema);