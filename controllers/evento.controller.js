"use strict"
const Evento = require("../models/evento.model")
const Galeria = require("../models/galeria.model")
function getEventos(peticion,respuesta) {
    Evento.find({},{},(err,resultado)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({eventos:resultado})            
        }
    })
}

function crearEvento(req,res) {
    let params = req.body
    let newEvento = new Evento()
    newEvento.titulo = params.titulo
    newEvento.descripcion = params.descripcion
    newEvento.fecha = params.fecha
    let newGaleria = new Galeria ()
    newGaleria.save((err,saved)=>{ //creo una galeria para asignarle su id al evento que voy a crear, el llenar la galeria de fotos se hace desde el controlador de galeria 
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
    getEventos,
    crearEvento
}
