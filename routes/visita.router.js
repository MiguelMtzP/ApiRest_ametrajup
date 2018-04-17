'use strict'

const express = require('express');
var api= express.Router();
const VistaController = require("../controllers/vista.controller")
api.get("/getVisitas",VistaController.getVisitas)

module.exports = api;