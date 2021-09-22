'use strict'

var express = require('express')
var userController = require('../controllers/user.controller')
var mdAuth = require('../middlewares/middleware')

var api = express.Router();

api.post('/login', userController.login);
api.get('/getEmpresas', mdAuth.ensureAuth, userController.getEmpresas);
api.post('/saveEmpresa', mdAuth.ensureAuth ,userController.saveEmpresa);
api.put('/updateEmpresa/:id',mdAuth.ensureAuth, userController.updateEmpresa);
api.put('/removeEmpresa/:id',mdAuth.ensureAuth, userController.removeEmpresa);

module.exports = api;