'use strict'

const express = require('express');
var api= express.Router();
var middlewareAuth = require("../middlewares/authentication")
var middlewareUploader = require("../middlewares/multimediaUploader")
const UsuarioController = require("../controllers/usuario.controller")

api.get("/fotoPerfil/:file",UsuarioController.getFotoPerfil)
api.post("/login",UsuarioController.login)
api.post("/",middlewareUploader.cargaFotoPerfil.single("fotoPerfil"),UsuarioController.registro)


module.exports = api;