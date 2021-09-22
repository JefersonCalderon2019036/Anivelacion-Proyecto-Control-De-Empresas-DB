'use strict'

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

//Importaciones de rutas
var User = require('./src/routes/userRoutes')
var Empleado = require('./src/routes/empleadoRoutes')

//Middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//cors
app.use(cors())

//rutas
app.use('/api', User)
app.use('/api', Empleado)

module.exports = app;