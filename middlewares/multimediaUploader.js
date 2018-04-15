var multer = require("multer")
var path = require("path")
var Usuario = require("../models/usuario.model")
var rutaMultimedia = "multimedia/"

var cargaFotoPerfil = multer({
    storage:multer.diskStorage({
        destination:(peticion,archivo,callback)=>{
            
            callback(null,rutaMultimedia+"usuarios/")
        },
        filename:(peticion,archivo,callback)=>{
            let user = new Usuario()
            peticion.body.user = user
            
            var extensionArchivo = path.extname(archivo.originalname)
            callback(null,user._id + extensionArchivo) 
        }
    })
})

module.exports = {
    cargaFotoPerfil
}