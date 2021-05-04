const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    data: Date,
    commessa: {type: String, required: true},
    cliente: String,
    prodotto: String,
    quantitaPrevista: Number,
    stato: {type: String, enum: ['attiva', 'conclusa', 'cancellata', 'errore']},
    quantitaProdotta: Number,
    errore: String
});

module.exports = mongoose.model('Log', LogSchema);
