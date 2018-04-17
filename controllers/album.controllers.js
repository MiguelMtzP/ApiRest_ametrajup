"use strict"
const Album = require("../models/album.model")

function getAlbum(peticion,respuesta) {
    Album.find({},{},(err,resultado)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({album:resultado})            
        }
    })
}


module.exports = {
    getAlbum
}