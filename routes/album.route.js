'use strict'

const express = require('express');
var api= express.Router();
const AlbumController = require("../controllers/album.controller")
api.get("/getAlbum",AlbumController.getAlbum)


module.exports = api;