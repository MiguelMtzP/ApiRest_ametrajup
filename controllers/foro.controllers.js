"use strict"
const Foro = require("../models/foro.model")

function getForos(peticion,respuesta) {
    Evento.find({},{},(err,resultado)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({foros:resultado})            
        }
    })
}


module.exports = {
    getForos
}