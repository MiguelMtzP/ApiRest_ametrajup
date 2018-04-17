"use strict"
var mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

var ForoSchema = mongoose.Schema({
    titulo:String,
    descripcion:String,
    idGaleria:{type:mongoose.Schema.ObjectId,ref:"Galeria"},
    idUsuario:{type: mongoose.Schema.ObjectId,ref:"Usuario"} 
})

ForoSchema.plugin(uniqueValidator,{message:"Error, expected {PATH} to be unique."})

module.exports = mongoose.model("Foro",ForoSchema)