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

module.exports= {
    registro,
    getFotoPerfil,
    login
}