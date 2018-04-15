"use strict"
var mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

var GaleriaSchema = mongoose.Schema({
    files:[{
        contentType: String,
        url:String
    }]
})

GaleriaSchema.plugin(uniqueValidator,{message:"Error, expected {PATH} to be unique."})

module.exports = mongoose.model("Galeria",GaleriaSchema)