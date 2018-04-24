'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var usrSchema = Schema ({
    nombre: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    correo: {type:String,unique:true},
    genero: String,
    ocupacion: String,
    telefono: String,
    contrasenia: String,
    empresa: String,
    sector: String,
    pais: String,
    ciudad: String,
    estado: String,
    isAdmin: {type:Boolean,default:false},
    fotoPerfil: String
});

usrSchema.plugin(uniqueValidator,{message:"Error, expected {PATH} to be unique."})


module.exports = mongoose.model('Usuario',usrSchema);
