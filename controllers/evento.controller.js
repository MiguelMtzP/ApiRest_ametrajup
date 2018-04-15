"use strict"
const Evento = require("../models/evento.model")

function getEventos(peticion,respuesta) {
    Evento.find({},{},(err,resultado)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({eventos:resultado})            
        }
    })
}


module.exports = {
    getEventos
}
