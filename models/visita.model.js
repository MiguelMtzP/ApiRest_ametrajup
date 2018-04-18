'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var visitaSchema = Schema ({
    ip: String,
    estado: String,
    fecha: {
        type:Date,
        default:Date.now
    }
});

visitaSchema.plugin(uniqueValidator,{message:"Error, expected {PATH} to be unique."})

module.exports = mongoose.model('Visita',visitaSchema);