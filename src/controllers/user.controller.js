'use strict'

var User = require('../models/user')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
//var Empleado = require('./models/empleado');

function createInit(req, res){
    let user = new User();
    User.findOne({username: 'Admin'}, (err, userFind)=>{
        if(err){
            console.log('Error al cargar el administrador');
        }else if(userFind){
            console.log('El administrador ya fué creado')
        }else{
            user.password = "123456";
            bcrypt.hash(user.password, null, null, (err, passwordHash)=>{
                if(err){
                    res.status(500).send({message: 'Error al encriptar la contraseña'})
                }else if(passwordHash){
                    user.username = "Admin";
                    user.password = passwordHash;
                    user.role = "ADMIN"
                    user.save((err, userSave)=>{
                        if(err){
                            console.log('Error al crear al administrador')
                        }else if(userSave){
                            console.log('El administrador fué creado')
                        }else{
                            console.log('El administrador no fué creado')
                        }
                    })
                }
            })
        }
    })
}

function login(req, res){
    var params = req.body;

    if(params.username && params.password){
        User.findOne({username: params.username}, (err, userFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general'});
            }else if(userFind){
                bcrypt.compare(params.password, userFind.password, (err, checkPassword)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general en la verificación de la contraseña'});
                    }else if(checkPassword){
                        return res.send({message: 'Usuario logeado', token: jwt.createToken(userFind), user: userFind })
                    }else{
                        return res.status(404).send({message: 'Contraseña incorrecta'});
                    }
                })
            }else{
                return res.send({message: 'usuario no encontrado'})
            }
        })
    }else{
        return res.status(401).send({message: 'Porfavor ingresa todos los datos'});
    }
}

module.exports = {
    createInit,
    login
}