"use strict"
var mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

var comentarioSchema= mongoose.Schema({
    idComentarioPadre: {type:mongoose.Schema.ObjectId,ref:"Comentario"},
    fecha:Date,
    idForo: {type:mongoose.Schema.ObjectId,ref:"Foro"},
    mensaje:String
})

comentarioSchema.plugin(uniqueValidator,{message:"Error, expected {PATH} to be unique."})

module.exports = mongoose.model("Comentario",comentarioSchema)