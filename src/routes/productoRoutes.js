'use strict'

var express = require('express');
var productoController = require('../controllers/producto.controller');
var mdAuth = require('../middlewares/middleware')

var api = express.Router();

api.post('/setProducto', mdAuth.ensureAuth ,productoController.setProducto);
api.put('/listProductos', mdAuth.ensureAuth, productoController.listProductos);
api.put('/simuVenta/:idP', mdAuth.ensureAuth ,productoController.simuVenta);
api.post('/searchP', mdAuth.ensureAuth ,productoController.searchP);
api.post('/searchPS', mdAuth.ensureAuth ,productoController.searchPS);


module.exports = api;