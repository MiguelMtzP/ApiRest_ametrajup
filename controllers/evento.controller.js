"use strict"
const Evento = require("../models/evento.model")
const Galeria = require("../models/galeria.model")


function getEventos(peticion,respuesta) {
    Evento.find().sort({fecha:1})
    .exec((err,resultado)=>{
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

function actualizaEnvento(req,res) {
    let idEvento = req.params.idEvento
    let params = req.body
    let evento = {}
    if (params.titulo){
        evento.titulo = params.titulo
    }

    if (params.descripcion){
        evento.descripcion= params.descripcion
    }

    if (params.fecha){
        evento.fecha = params.fecha
    }

    Evento.findByIdAndUpdate(idEvento,{$set:evento},{new:true})
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            res.status(200).send({eventoActualizado:result})            
        }
    })
}

function EliminarEvento(req,res) {
    let idEvento = req.params.idEvento
    Evento.findByIdAndRemove(idEvento)
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else if(!result){
            res.status(500).send({err:"Evento no encontrado"})
        }else{
            res.status(200).send({exito:"evento eliminado con exito"})            
        }
    })
}

function getEventoById(req,res) {
    let id = req.params.idEvento
    Evento.findById(id)
    .exec((err,resultado)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            res.status(200).send({evento:resultado})            
        }
    })
}
module.exports = {
    getEventos,
    crearEvento,
    actualizaEnvento,
    EliminarEvento,
    getEventoById
}
