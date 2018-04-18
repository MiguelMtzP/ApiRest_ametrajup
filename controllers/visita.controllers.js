"use strict"
const Visita = require("../models/visita.model")

function getVisitas(peticion,respuesta) {
    Visita.find().sort({fecha:1})
    .exec((err,result)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({visitas:result})            
        }
    })
}


module.exports = {
    getVisitas
}