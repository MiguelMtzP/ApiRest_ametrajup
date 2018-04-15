'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var eventoSchema = Schema ({
    titulo: String,
    descripcion: String,
    fecha: Date,
    idGaleria: {type: Schema.ObjectId, ref: "Galeria"}
});

eventoSchema.plugin(uniqueValidator,{message:"Error, expected {PATH} to be unique."})

module.exports = mongoose.model('Evento',eventoSchema);