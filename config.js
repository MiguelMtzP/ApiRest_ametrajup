
'use strict'

var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'privateKeyAmetrajup';
var urlServer = "http://localhost:3000"
module.exports= {
    jwtOptions,
    urlServer
};