'use strict'

const express = require('express');
var api= express.Router();
const ComentarioController = require("../controllers/comentario.controller")
api.get("/getComentarios",ComentarioController.getComentarios)


module.exports = api;