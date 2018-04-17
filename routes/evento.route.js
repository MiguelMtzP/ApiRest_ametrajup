'use strict'

const express = require('express');
var api= express.Router();
const middlewareAuth = require ("../middlewares/authentication")
const EventoController = require("../controllers/evento.controller")
api.get("/",EventoController.getEventos)
api.post("/",middlewareAuth.authenticate("jwt",{session:false}),EventoController.crearEvento)


module.exports = api;