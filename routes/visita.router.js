'use strict'

const express = require('express');
var api= express.Router();
var middlewareAuth = require("../middlewares/authentication")
const VistaController = require("../controllers/visita.controllers")

api.get("/logo",VistaController.getLogo)
api.get("/lema",VistaController.getLema)
api.get("/",middlewareAuth.authenticate("jwt",{session:false}),VistaController.getVisitas)
api.post("/",middlewareAuth.authenticate("jwt",{session:false}),VistaController.crearVisita)

module.exports = api;
