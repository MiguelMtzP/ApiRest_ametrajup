"use strict"
const Comentario = require("../models/comentario.model")
const Foro = require("../models/foro.model")

function getComentarios(peticion,respuesta) {
    let idForo= req.params.idForo
    Comentario.find({idForo:idForo}).sort({fecha:1})
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
    newComentario.idForo = params.idForo
    if(params.idComentarioPadre){
        newComentario.idComentarioPadre = params.idComentarioPadre
    }
    newComentario.idUsuario = req.user._id
    newComentario.save((err,result)=>{
        if (err) {
            res.status(500).send({"err":err})
        } else {
            res.status(200).send({comentarioCreado:result})
        }
    })
}


function actualizaComentario(req,res) {
    let idComentario = req.params.idComentario
    let params = req.body
    let comentario = {}
    if (params.mensaje){
        comentario.mensaje = params.mensaje
    }
    comentario.fecha = new Date()
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
    Comentario.find({idComentarioPadre:idComentario}).sort({fecha:1})
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
