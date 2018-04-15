"use strict"
var mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

var AlbumSchema = mongoose.Schema({
    titulo:String,
    descripcion:String,
    idGaleria:{
        type:mongoose.Schema.ObjectId,
        ref:"Galeria"
    },
    fecha:Date
})

AlbumSchema.plugin(uniqueValidator,{message:"Error, expected {PATH} to be unique."})

module.exports = mongoose.model("Album",AlbumSchema)