'use strict'

const express = require('express');
var api= express.Router();
var middlewareAuth = require("../middlewares/authentication")
var middlewareUploader = require("../middlewares/multimediaUploader")
const GaleriaCotroller = require("../controllers/galeria.controller")

api.put("/:idGaleria",
        middlewareAuth.authenticate("jwt",{session:false}),
        middlewareUploader.cargaFotosGaleria.array("fotos"),
        GaleriaCotroller.CargaFotos)
api.get("/:idGaleria/:file",GaleriaCotroller.getFoto)
api.delete("/:idGaleria/:idFoto",middlewareAuth.authenticate("jwt",{session:false}),GaleriaCotroller.eliminaFoto)

module.exports = api;