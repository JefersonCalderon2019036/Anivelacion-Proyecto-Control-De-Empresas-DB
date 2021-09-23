'use strict'

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

//Importaciones de rutas
var User = require('./src/routes/userRoutes')
var Empleado = require('./src/routes/empleadoRoutes')
var Producto = require('./src/routes/productoRoutes')

//Middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//cors
app.use(cors())

//rutas
app.use('/api', User)
app.use('/api', Empleado)
app.use('/api', Producto)

module.exports = app;