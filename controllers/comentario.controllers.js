"use strict"
const Comentario = require("../models/comentario.model")

function getComentarios(peticion,respuesta) {
    Comentario.find().sort({fecha:1})
    .exec((err,resultado)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({comentarios:resultado})            
        }
    })
}

function crearEvento(req,res) {
    let params = req.body
    let newComentario = new Comentario()
    newComentario.mensaje = params.mensaje
    newEvento.fecha = params.fecha
    let newGaleria = new Galeria ()
    newGaleria.find((err,saved)=>{ //creo una galeria para asignarle su id al evento que voy a crear, el llenar la galeria de fotos se hace desde el controlador de galeria 
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            newEvento.idGaleria = saved._id 
            newEvento.save((err,eventoCreado)=>{
                if (err) {
                    res.status(500).send({err:err.message})
                } else {
                    res.status(200).send({eventoCreado:eventoCreado})
                }
            })
        }
    })
}


module.exports = {
    getComentarios
}