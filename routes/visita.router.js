'use strict'

const express = require('express');
var api= express.Router();
const VistaController = require("../controllers/visita.controllers")

api.get("/",VistaController.getVisitas)

module.exports = api;