"use strict"
const Visita = require("../models/visita.model")

function getVisitas(peticion,respuesta) {
    Evento.find({},{},(err,resultado)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({visitas:resultado})            
        }
    })
}


module.exports = {
    getVisitas
}