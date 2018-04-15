'use strict'

const express = require('express');
var api= express.Router();
const EventoController = require("../controllers/evento.controller")
api.get("/ejemplo",EventoController.getEventos)


module.exports = api;