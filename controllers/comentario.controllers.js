"use strict"
const Comentario = require("../models/comentario.model")
const Foro = require("../models/foro.model")

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

function crearComentario(req,res) {
    let params = req.body
    let newComentario = new Comentario()
    newComentario.mensaje = params.mensaje
    newComentario.fecha = params.fecha
    newComentario.idForo = req.user._id
}

function actualizaComentario(req,res) {
    let idComentario = req.params.idComentario
    let params = req.body
    let comentario = {}
    if (params.titulo){
        comentario.mensaje = params.mensaje
    }
    Comentario.findByIdAndUpdate(idComentario,{$set:comentario},{new:true})
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            res.status(200).send({comentarioActualizado:result})            
        }
    })
}

function EliminarComentario(req,res) {
    let idComentario = req.params.idComentario
    Comentario.findByIdAndRemove(idComentario)
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else if(!result){
            res.status(500).send({err:"Comentario no encontrado"})
        }else{
            res.status(200).send({exito:"Comentario eliminado con exito"})            
        }
    })
}

function getRespuestasById(req,res) {
    let idComentario = req.params.idComentario
    Comentario.find({idComentarioPadre:idComentario})
    .exec((err,resultado)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            res.status(200).send({respuesta:resultado})            
        }
    })
}


module.exports = {
    getComentarios,
    crearComentario,
    actualizaComentario,
    EliminarComentario,
    getRespuestasById
}