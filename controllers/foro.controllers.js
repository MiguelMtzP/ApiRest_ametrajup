"use strict"

const Foro = require("../models/foro.model")
const Comentario = require("../models/comentario.model")
const Galeria = require("../models/galeria.model")
const Usuario = require("../models/usuario.model")
const mongoose = require('mongoose');

function getForos(peticion,respuesta) {
    Foro.find().sort({fecha:1})//ordena por fecha
    .populate({path:"idUsuario",select:"nombre apellidoPaterno apellidoMaterno"})
    .exec((err,resultado)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {

          Comentario.aggregate([
            {
              $group:{
                _id:"$idForo",total:{$sum:1}
              }
            }
          ]).exec((err,result)=>{
            if (err) {
                respuesta.status(500).send({"err":err})
            } else {
              for (var i = 0; i < resultado.length; i++) {
                for (var j = 0; j < result.length; j++) {
                  if (resultado[i]._id.toString() == result[j]._id.toString() ) {

                    resultado[i].comentarios = result[j].total
                  }
                }
              }
              respuesta.status(200).send({foros:resultado})
            }
          })
        }
    })
}


function crearForo(req,res) {
    let params = req.body
    let newForo = new Foro()
    newForo.titulo = params.titulo
    newForo.descripcion = params.descripcion
    newForo.fecha = params.fecha
    newForo.idUsuario = req.user._id
    let galeria = new Galeria
    galeria.save((err,saved)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            newForo.idGaleria = saved._id
            newForo.save((err,savedForo)=>{
                if (err) {
                    res.status(500).send({err:err.message})
                } else {
                    res.status(200).send({foro:savedForo})
                }
            })
        }
    })
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

    Foro.findByIdAndUpdate(idForo,{$set:foro},{new:true})
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
    .populate({path:"idGaleria"})
    .populate({path:"idUsuario",select:"nombre apellidoPaterno apellidoMaterno"})
    .exec((err,resultado)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
          Comentario.find({idForo:idForo})
          .populate({path:"idUsuario",select:"nombre apellidoPaterno apellidoMaterno"})
          .exec((err,coments)=>{
            if (err) {
                res.status(500).send({err:err.message})
            } else {
              res.status(200).send({foro:resultado,commentarios:coments})
            }
          })
        }
    })
}


function getMisForos(req, res){
    Foro.find({idUsuario:req.user._id}).sort({fecha:1})
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            res.status(200).send({misforos:resultado})
        }
    })
}

module.exports = {
    getForos,
    crearForo,
    actualizaForo,
    EliminarForo,
    getForoById,
    getMisForos
}
