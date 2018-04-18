var multer = require("multer")
var path = require("path")
var Usuario = require("../models/usuario.model")
var rutaMultimedia = "multimedia/"
const fs = require("fs")
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

var ActualizaFotoPerfil = multer({
    storage:multer.diskStorage({
        destination:(peticion,archivo,callback)=>{
            
            callback(null,rutaMultimedia+"usuarios/")
        },
        filename:(peticion,archivo,callback)=>{
            let user = peticion.user            
            var extensionArchivo = path.extname(archivo.originalname)
            callback(null,user._id + extensionArchivo) 
        }
    })
})

var cargaFotosGaleria = multer({
    fileFilter:(req,file,cb)=>{
        if (!req.body.fotosArray){
            console.log("entro al filter")
            req.body.fotosArray = []
            let ar = []
        }
        cb(null,true)
    }
    ,storage:multer.diskStorage({
        destination:(peticion,archivo,callback)=>{
            let dir = rutaMultimedia+"galerias/"+peticion.params.idGaleria+"/"
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            
            callback(null,dir)

        },
        filename:(peticion,archivo,callback)=>{
            var extensionArchivo = path.extname(archivo.originalname)
            let nameFile = (Math.round(Math.random()*10000000)).toString() + extensionArchivo 
            var foto = {
                contentType:archivo.mimetype.split("/")[0],
                url: nameFile
            }
            peticion.body.fotosArray.push(foto)
            console.log(peticion.body.fotosArray.length)
            callback(null,nameFile) 
        }
    })
})


module.exports = {
    cargaFotoPerfil,
    cargaFotosGaleria,
    ActualizaFotoPerfil
}