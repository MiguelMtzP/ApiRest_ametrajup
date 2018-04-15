'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Shema;
var uniqueValidator = require('mongoose-unique-validator');

var visitaSchema = Schema ({
    ip: String,
    estado: String,
    fecha: Date
});

visitaSchema.plugin(uniqueValidator,{message:"Error, expected {PATH} to be unique."})

module.exports = mongoose.model('Vista'.vistaSchema);