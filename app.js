'use strict'

const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
var middlewareAuth = require('./middlewares/authentication');

// rutas de la api
var eventoRouter = require("./routes/evento.route")
var usuarioRouter = require("./routes/usuario.route")
var galeriaRouter = require("./routes/galeria.route")
var visitaRouter = require("./routes/visita.router")
var foroRouter = require("./routes/foro.route")
var albumRouter = require("./routes/album.route")
var comentarioRouter = require("./routes/comentario.route")


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());
//middleware para permitir metodos
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.header('Allow','GET, POST, PUT, DELETE')
  next();
});
//middleware de autenticacion
app.use(middlewareAuth.initialize());
app.use("/eventos",eventoRouter)
app.use("/usuarios",usuarioRouter)
app.use("/galerias",galeriaRouter)
app.use("/foros",foroRouter)
app.use("/albums",albumRouter)
app.use("/visitas",visitaRouter)

module.exports = app;