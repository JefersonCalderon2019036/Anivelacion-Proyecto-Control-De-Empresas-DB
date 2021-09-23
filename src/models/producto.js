'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = Schema({
    name: String,
    proveedor: String,
    stock: Number,
    cantVendida: Number,
    empresa: [{type: Schema.ObjectId, ref: 'user'}]
});

module.exports = mongoose.model('producto', productoSchema);