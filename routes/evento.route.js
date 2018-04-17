'use strict'

const express = require('express');
var api= express.Router();
const EventoController = require("../controllers/evento.controller")
api.get("/getEventos",EventoController.getEventos)


module.exports = api;