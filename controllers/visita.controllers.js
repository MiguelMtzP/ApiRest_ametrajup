"use strict"
const Visita = require("../models/visita.model")

function getVisitas(peticion,respuesta) {
    Visita.find().sort({fecha:1})
    .exec((err,result)=>{
        if (err) {
            respuesta.status(500).send({"err":err})
        } else {
            respuesta.status(200).send({visitas:result})            
        }
    })
}

function crearVisita(req,res) {
    let estado = req.body.estado
    let ip = req.body.ip
    let now = new Date()
    now.setMinutes(now.getMinutes()-30) 
    Visita.findOne({ip:ip,fecha:{$gt:now}})
    .exec((err,result)=>{
        if (err) {
            res.status(500).send({err:err.message})
        } else if(result){
            Visita.findByIdAndUpdate(result._id,{$set:{fecha: new Date()}},{new:true})
            .exec((err,result)=>{
                if (err) {
                    res.status(500).send({err:err.message})   
                } else {
                    res.status(200).send({visitaAct:result})   
                }
            })
        }else{
            let newVisita = new Visita()
            newVisita.ip = ip
            newVisita.estado = estado
            newVisita.save((err,saved)=>{
                if (err) {
                    res.status(500).send({err:err.message})   
                } else {
                    res.status(200).send({visitaGuardada:saved})   
                }
            })
        }
    })
}


module.exports = {
    getVisitas,
    crearVisita
}