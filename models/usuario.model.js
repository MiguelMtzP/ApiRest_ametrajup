'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Shema;
var uniqueValidator = require('mongoose-unique-validator');

var usrSchema = Schema ({
    nombre: String,
    apM: String,
    apP: String,
    correo: String,
    genero: String,
    ocupacion: String,
    tel: Number,
    empresa: String,
    sector: String,
    isAdmin: Boolean,
    foto: String
});

usrSchema.plugin(uniqueValidator,{message:"Error, expected {PATH} to be unique."})


module.exports = mongoose.model('Usuario',usrSchema);