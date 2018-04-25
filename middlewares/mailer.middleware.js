"use strict"
var nodemailer=require("nodemailer");
var mongoose=require("mongoose");
var config=require("../config");
const jwt = require("jsonwebtoken");

var transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: config.dataMail
});


var sendContactEmail=(req,res,next)=>{

    try {
      var logoAmetrajup = "http://www.artisticquiltdesign.com/wp-content/uploads/logos-portfolio-project-logos.png"
      var nombreCompleto = req.body.nombre
      var mailCliente = {
        from:"ame130813@hotmail.com",
          to: req.body.email,
          subject: 'Gracias por escribirnos',
          html: `
          <!DOCTYPE html>
          <html>
          <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
          </head>
          <body>
              <div class="container text-center" style="margin-top: 40px;">
                  <div class="row" style="margin-bottom: 50px">
                    <div class= "col-md-6 col-md-offset-3">
                      <img src="${logoAmetrajup}" alt="" class="img-responsive">
                    </div>
                  </div>

                  <div class="row" >
                      <h1 style="letter-spacing: 1pt">Hola ${nombreCompleto}:</h1><br>

                      <span style="font-size: 26px;font-weight: 100;letter-spacing: 1pt">
                          Gracias por ponerte en contacto, atenderemos tu solicitud <br>
                          lo antes posible.
                      </span>
                      <br><br>
                  </div>
          </div>
          </body>
          </html>

          `
      };

      var mailOptions = {
        from:"ame130813@hotmail.com",
          to: "ame130813@hotmail.com",
          subject: "Nuevo contacto: "+req.body.asunto,
          html: `
          <!DOCTYPE html>
          <html>
          <head>

          </head>
          <body>
              <div class="container text-center" style="margin-top: 40px;">

                  <div class="row" >
                      <h2 style="letter-spacing: 1pt">${nombreCompleto}, escribió:</h2><br>
                      <h3>Asunto: <small>${req.body.asunto}</small></h3>
                      <h3>Ocupacion: <small>${req.body.ocupacion}</small></h3>
                      <h3>Correo: <small>${req.body.email}</small></h3>
                      <h3>Telefono: <small>${req.body.telefono}</small></h3>
                      <h3>Mensaje: </h3>
                      <p style="font-size: 18px;font-weight: 100;letter-spacing: 1pt">
                          ${req.body.mensaje}
                      </p>
                      <br><br>
                  </div>
          </div>
          </body>
          </html>

          `
      };

        transporter.sendMail(mailCliente, function (error, infoCliente) {
            if (error) {
              res.status(500).send({err:error})
            } else {
              transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    res.status(500).send({err:error})
                  } else {
                      res.status(200).send({cliente:infoCliente,local:info})
                  }
              });
            }
        });
    } catch (error) {
      res.status(500).send({err:error})
    }
}


module.exports = { sendContactEmail};
