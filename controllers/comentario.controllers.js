"use strict"
const Comentario = require("../models/comentario.model")

function getComentarios(peticion,respuesta) {
    Evento.find({},{},(err,resultado)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({comentarios:resultado})            
        }
    })
}


module.exports = {
    getComentarios
}