'use strict'

const express = require('express');
var api= express.Router();
const ForoController = require("../controllers/foro.controller")
api.get("/getForos",ForoController.getForos)


module.exports = api;