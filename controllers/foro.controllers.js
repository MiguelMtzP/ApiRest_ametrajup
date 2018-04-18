"use strict"

const Foro = require("../models/foro.model")
const Galeria = require("../models/galeria.model")
const Usuario = +require("../models/usuario.model")

function getForos(peticion,respuesta) {
    Foro.find().sort({fecha:1})//ordena por fecha
    .exec((err,resultado)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({foros:resultado})            
        }
    })
}

//pendiente 
function crearForo(req,res) {
    let params = req.body
    let newForo = new Foro()
    newForo.titulo = params.titulo
    newForo.descripcion = params.descripcion
    newForo.fecha = params.fecha
}

function actualizaForo(req,res) {
    let idForo = req.params.idForo
    let params = req.body
    let foro = {}
    if (params.titulo){
        foro.titulo = params.titulo
    }

    if (params.descripcion){
        foro.descripcion= params.descripcion
    }

    if (params.fecha){
        foro.fecha = params.fecha
    }

    Foro.findByIdAndUpdate(idForo,{$set:evento},{new:true})
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            res.status(200).send({foroActualizado:result})            
        }
    })
}

function EliminarForo(req,res) {
    let idForo = req.params.idForo
    Foro.findByIdAndRemove(idForo)
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else if(!result){
            res.status(500).send({err:"Foro no encontrado"})
        }else{
            res.status(200).send({exito:"Foro eliminado con exito"})            
        }
    })
}

function getForoById(req,res) {
    let idForo = req.params.idForo
    Foro.findById(idForo)
    .exec((err,resultado)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            res.status(200).send({foro:resultado})            
        }
    })
}

//pendiente
function getMiForo(req, res){

}

module.exports = {
    getForos,
    crearForo,
    actualizaForo,
    EliminarForo,
    getForoById,
    getMiForo
}