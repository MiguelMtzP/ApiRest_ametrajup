var Usuario = require("../models/usuario.model")
var rutaMultimedia = "/usuarios/fotoPerfil/"
var path = require("path")
var config = require("../config")
var jwt = require('jsonwebtoken');
function registro(req,res) {
    if (req.file){
        let user = req.body.user
        let params = req.body
        user.nombre = params.nombre
        user.apellidoPaterno = params.apellidoPaterno
        user.apellidoMaterno = params.apellidoMaterno
        user.correo = params.correo
        user.genero = params.genero
        user.ocupacion = params.ocupacion
        user.telefono = params.telefono

        user.ciudad = params.ciudad
        user.estado = params.estado
        user.pais = params.pais
        user.empresa = params.empresa
        user.sector = params.sector
        user.contrasenia = params.contrasenia
        if (params.isAdmin){
            user.isAdmin = params.isAdmin
        }

        console.log(req.file)
        let fotoPerfil =config.urlServer + rutaMultimedia + req.file.filename

        user.fotoPerfil = fotoPerfil
        user.save((err,result)=>{
            if (err) {
                res.status(500).send({"err":err.message})

            } else {
                var payload = {"id":user._id};
                var token = jwt.sign(payload, config.jwtOptions.secretOrKey);
                res.status(200).send({"usuarioRegistrado":result,"token":token})
            }
        })

    }else{
        res.status(500).send({"err":"fallo al cargar la imagen de perfil"})
    }
}

function getFotoPerfil(req,res){
    let filename = req.params.file
    res.sendFile(path.resolve("multimedia/usuarios/"+filename))
}

function login(req,res) {
    let params=req.body

    Usuario.findOne({"correo":params.correo,"contrasenia":params.contrasenia})
    .exec((err,usr)=>{
        if (err) {
            res.status(500).send({"err":err.message})

        } else if (!usr){
            res.status(403).send({"err":"Usuario o contraseña no validos"})

        }else{
            var payload = {"id":usr._id};
            var token = jwt.sign(payload, config.jwtOptions.secretOrKey);
            res.status(200).send({user:usr,token:token})

        }
    })
}

function editarPerfil(req,res) {
    let params = req.body
    let update = {}
    if(params.nombre){
        update.nombre = params.nombre
    }
    if (params.apellidoMaterno){
        update.apellidoMaterno = params.apellidoMaterno
    }
    if (params.apellidoPaterno){
        update.apellidoPaterno = params.apellidoPaterno
    }
    if (params.correo){
        update.correo = params.correo
    }
    if (params.genero){
        update.genero = params.genero
    }
    if (params.ocupacion){
        update.ocupacion = params.ocupacion
    }
    if (params.telefono){
        update.telefono = params.telefono
    }
    if (params.contrasenia){
        update.contrasenia = params.contrasenia
    }
    if (params.empresa){
        update.empresa = params.empresa
    }
    if (params.sector){
        update.sector = params.sector
    }
    Usuario.findByIdAndUpdate(req.user._id,{$set:update},{new:true})
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({"err":err.message})
        } else {
            res.status(200).send({"perfilActualizado":result})
        }
    })
}

function editaFotoPerfil(req,res) {
    if (req.file){
        let fotoPerfil =config.urlServer + rutaMultimedia + req.file.filename
        Usuario.findByIdAndUpdate(req.user._id,{$set:{fotoPerfil:fotoPerfil}},{new:true})
        .exec((err,updated)=>{
            if (err) {
                res.status(500).send({"err":err.message})
            } else {
                res.status(200).send({"perfilActualizado":updated})
            }
        })
    }else{
        res.status(500).send({"err":"fallo al guardar la foto de perfil"})
    }
}

function eliminaUsuario(req,res) {
    if (req.user.isAdmin) {
        let id = req.params.idUsuario
        Usuario.findByIdAndRemove(id)
        .exec((err,success)=>{
            if (err) {
                res.status(500).send({"err":err.message})
            } else {
                res.status(200).send({"usrEliminado":success})
            }
        })
    } else {
        res.status(401).send({"err":"no tienes permiso para realizar esta accion"})
    }
}

function getusuarios(req,res) {
    if (req.user.isAdmin) {
        Usuario.find().sort({apellidoPaterno:1,apellidoMaterno:1,nombre:1})
        .exec((err,result)=>{
            if (err) {
                res.status(500).send({"err":err.message})
            } else {
                res.status(200).send({"usuarios":result})
            }
        })
    } else {
        res.status(401).send({"err":"no tienes permiso para realizar esta accion"})
    }
}
module.exports= {
    registro,
    getFotoPerfil,
    login,
    editaFotoPerfil,
    editarPerfil,
    eliminaUsuario,
    getusuarios
}
