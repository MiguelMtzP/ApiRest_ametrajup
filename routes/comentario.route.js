'use strict'

const express = require('express');
var api= express.Router();
const ComentarioController = require("../controllers/comentario.controllers")
const middlewareAuth = require ("../middlewares/authentication")

api.get("/byForo/:idForo",ComentarioController.getComentarios)
api.delete("/:idComentario",middlewareAuth.authenticate("jwt",{session:false}),ComentarioController.EliminarComentario)
api.put("/:idComentario",middlewareAuth.authenticate("jwt",{session:false}),ComentarioController.actualizaComentario)
api.post("/",middlewareAuth.authenticate("jwt",{session:false}),ComentarioController.crearComentario)
api.get("/:idComentario",ComentarioController.getRespuestasById)

module.exports = api;