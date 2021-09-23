'use strict'

var express = require('express');
var productoController = require('../controllers/producto.controller');
var mdAuth = require('../middlewares/middleware')

var api = express.Router();

api.post('/setProducto', mdAuth.ensureAuth ,productoController.setProducto);
api.get('/listProductos', mdAuth.ensureAuth, productoController.listProductos);
//api.put('/simuVenta/:idP', mdAuth.ensureAuth ,productoController.simuVenta);


module.exports = api;