"use strict"
var mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

var comentarioSchema= mongoose.Schema({
    idComentarioPadre: {type:mongoose.Schema.ObjectId,ref:"Comentario"},
    fecha:{type:Date,default:Date.now},
    idForo: {type:mongoose.Schema.ObjectId,ref:"Foro"},
    mensaje:String,
    idUsuario:{type: mongoose.Schema.ObjectId,ref:"Usuario"} 
})

comentarioSchema.plugin(uniqueValidator,{message:"Error, expected {PATH} to be unique."})

module.exports = mongoose.model("Comentario",comentarioSchema)