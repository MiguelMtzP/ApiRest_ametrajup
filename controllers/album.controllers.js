"use strict"
const Album = require("../models/album.model")
const Galeria = require("../models/galeria.model")

function getAlbum(peticion,respuesta) {
    Album.find().sort({fecha:1})
    .exec((err,resultado)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({album:resultado})            
        }
    })
}
function crearAlbum(req,res) {
    let params = req.body
    let newAlbum = new Album()
    newAlbum.titulo = params.titulo
    newAlbum.descripcion = params.descripcion
    newAlbum.fecha = params.fecha
    let newGaleria = new Galeria ()
    newGaleria.save((err,saved)=>{ 
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            newAlbum.idGaleria = saved._id 
            newAlbum.save((err,AlbumCreado)=>{
                if (err) {
                    res.status(500).send({err:err.message})
                } else {
                    res.status(200).send({AlbumCreado:AlbumCreado})
                }
            })
        }
    })
}

function actualizaAlbum(req,res) {
    let idAlbum = req.params.idAlbum
    let params = req.body
    let album = {}
    if (params.titulo){
        album.titulo = params.titulo
    }

    if (params.descripcion){
        album.descripcion= params.descripcion
    }

    if (params.fecha){
        album.fecha = params.fecha
    }

    Album.findByIdAndUpdate(idAlbum,{$set:album},{new:true})
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            res.status(200).send({albumActualizado:result})            
        }
    })
}

function EliminarAlbum(req,res) {
    let idAlbum = req.params.idAlbum
    Album.findByIdAndRemove(idAlbum)
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else if(!result){
            res.status(500).send({err:"Album no encontrado"})
        }else{
            res.status(200).send({exito:"Album eliminado con exito"})            
        }
    })
}

function getAlbumById(req,res) {
    let idAlbum = req.params.idAlbum
    Album.findById(id)
    .exec((err,resultado)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            res.status(200).send({album:resultado})            
        }
    })
}

module.exports = {
    getAlbum,
    crearAlbum,
    actualizaAlbum,
    EliminarAlbum,
    getAlbumById

}