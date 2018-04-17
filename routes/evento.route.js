'use strict'

const express = require('express');
var api= express.Router();
const middlewareAuth = require ("../middlewares/authentication")
const EventoController = require("../controllers/evento.controller")
api.get("/:idEvento",EventoController.getEventoById)
api.get("/",EventoController.getEventos)
api.delete("/:idEvento",middlewareAuth.authenticate("jwt",{session:false}),EventoController.EliminarEvento)
api.put("/:idEvento",middlewareAuth.authenticate("jwt",{session:false}),EventoController.actualizaEnvento)
api.post("/",middlewareAuth.authenticate("jwt",{session:false}),EventoController.crearEvento)


module.exports = api;