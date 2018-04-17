'use strict'

var Galeria = require("../models/galeria.model")
const path = require("path")
const config = require("../config")
function CargaFotos(req,res) {
    if (req.files && req.files.length) {
        
        let url = config.urlServer + "/galerias/" + req.params.idGaleria+"/"
        let arregloFotos = req.body.fotosArray
        let idGaleria = req.params.idGaleria
        for (const foto of arregloFotos) {
            foto.url = url + foto.url
        }

        Galeria.findByIdAndUpdate(idGaleria,{$push:{files:{$each:arregloFotos}}},{new:true})
        .exec((err,result)=>{
            if (err) {
                res.status(500).send({err:err.message})
            } else {
                res.status(200).send({galeriaActualizada:result})
            }
        })
    }

}

function getFoto(req,res) {
    let idGaleria = req.params.idGaleria
    let nombreArchivo = req.params.file
    res.sendFile(path.resolve("multimedia/galerias/"+idGaleria+"/"+nombreArchivo))
}

function eliminaFoto(req,res) {
    let idFoto = req.params.idFoto
    let idGaleria = req.params.idGaleria 
    let foto = {_id:idFoto}
    Galeria.findOneAndUpdate({_id:idGaleria},{$pull:{files:{_id:idFoto}}},{new:true})
    .exec((err,updated)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else {
            res.status(200).send({galeriaActualizada:updated})            
        }
    })
}

module.exports = {
    CargaFotos,
    getFoto,
    eliminaFoto
}