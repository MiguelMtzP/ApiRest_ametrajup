'use strict'

const express = require('express');
var api= express.Router();
const middlewareAuth = require ("../middlewares/authentication")
const AlbumController = require("../controllers/album.controller")

api.get("/",AlbumController.getAlbum)
api.get("/:idAlbum",AlbumController.getAlbumById)
api.delete("/:idAlbum",middlewareAuth.authenticate("jwt",{session:false}),AlbumController.EliminarAlbum)
api.put("/:idAlbum",middlewareAuth.authenticate("jwt",{session:false}),AlbumController.actualizaAlbum)
api.post("/",middlewareAuth.authenticate("jwt",{session:false}),AlbumController.crearAlbum)


module.exports = api;