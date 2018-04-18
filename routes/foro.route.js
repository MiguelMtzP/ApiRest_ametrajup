'use strict'

const express = require('express');
var api= express.Router();
const ForoController = require("../controllers/foro.controller")
const middlewareAuth = require ("../middlewares/authentication")

api.get("/",ForoController.getForos)
api.get("/:idForo",ForoController.getForoById)
api.delete("/:idForo",middlewareAuth.authenticate("jwt",{session:false}),ForoController.EliminarForo)
api.put("/:idForo",middlewareAuth.authenticate("jwt",{session:false}),ForoController.actualizaForo)
api.post("/",middlewareAuth.authenticate("jwt",{session:false}),ForoController.crearForo)


module.exports = api;