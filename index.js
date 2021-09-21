'use strict'

var mongoose = require('mongoose')
var app = require('./app')
var userInit = require('./src/controllers/user.controller');

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://root:root@empresa.2jfn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useFindAndModify: true})
    .then(()=>{
        console.log('Estas conectado a la base de datos')
        userInit.createInit();
        app.listen(process.env.PORT || 3000, ()=>{
            console.log('El Servidor esta corriendo')
        })
    })
    .catch(err=>console.log(err))