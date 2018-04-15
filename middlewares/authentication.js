'use strict'

var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");
var User = require("../models/usuario.model")
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

const config = require('../config');

var strategy = new JwtStrategy(config.jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);

  User.findById(jwt_payload.id,(err,user)=>{
  if (err||!user) {
      console.log("error o no encontro usuario");
      next(null, false);
    }else {
      console.log("middlewareAuth aprobado");
      next(null, user);
    }
  });

});

passport.use(strategy);

module.exports= passport;