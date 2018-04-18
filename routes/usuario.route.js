'use strict'

const express = require('express');
var api= express.Router();
var middlewareAuth = require("../middlewares/authentication")
var middlewareUploader = require("../middlewares/multimediaUploader")
const UsuarioController = require("../controllers/usuario.controller")

api.get("/fotoPerfil/:file",UsuarioController.getFotoPerfil)

api.post("/login",UsuarioController.login)

api.put("/fotoPerfil",middlewareAuth.authenticate("jwt",{session:false}),middlewareUploader.ActualizaFotoPerfil.single("fotoPerfil"),UsuarioController.editaFotoPerfil)

api.post("/",middlewareUploader.cargaFotoPerfil.single("fotoPerfil"),UsuarioController.registro)

api.put("/",middlewareAuth.authenticate("jwt",{session:false}),UsuarioController.editarPerfil)

api.delete("/:idUsuario",middlewareAuth.authenticate("jwt",{session:false}),UsuarioController.eliminaUsuario)

api.get("/",middlewareAuth.authenticate("jwt",{session:false}),UsuarioController.getusuarios)


module.exports = api;