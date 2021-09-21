'use strict'

var express = require('express')
var userController = require('../controllers/user.controller')
var mdAuth = require('../middlewares/middleware')

var api = express.Router();

api.post('/login', userController.login);

module.exports = api;