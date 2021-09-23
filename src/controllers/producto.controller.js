'use strict'

var User = require('../models/user');
var Producto = require('../models/producto');

function setProducto(req, res) {
    var userId = req.user.sub;
    var params = req.body;
    var producto = new Producto();

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tienes permiso para realizar esta acción' })
    } else {
        if (params.name && params.proveedor && params.stock) {
            User.findById(userId, (err, userFind) => {
                if (err) {
                    return res.statis(500).send({ message: 'Error general' })
                } else if (userFind) {
                    producto.name = params.name;
                    producto.stock = params.stock;
                    producto.cantVendida = 0;
                    producto.proveedor = params.proveedor;
                    producto.empresa = userId

                    producto.save((err, productoSaved) => {
                        if (err) {
                            return res.status(500).send({ message: 'Error general al guardar' })
                        } else if (productoSaved) {
                            return res.send({ message: 'Producto agregado', productoSaved })
                        } else {
                            return res.status(404).send({ message: 'No se guardó el producto' })
                        }
                    })
                } else {
                    return res.status(404).send({ message: 'La empresa alque deseas agregar el producto no existe' })
                }
            })
        } else {
            return res.send({ message: 'Por favor ingresa los datos obligatorios' });
        }
    }
}

/*function simuVenta(req, res) {
    var userId = req.user.sub;
    var productoId = req.params.IdP;
    var params = req.body;

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tienes permiso para realizar esta acción' })
    } else {
        Producto.find( productoId, (err, productoFind) => {
            if (err) {
                return res.status(500).send({ message: 'Error general'})
            }else if (productoFind.stock < params.cant){
                console.log(productoFind);
                return res.send({ message: 'No hay producto en el stock mayor a lo que quieres descontar' })
            }else{
                Producto.findByIdAndUpdate(productoId, { $inc: { cantVendida: params.cant } }, { new: true }, (err, aumento) => {
                })
                Producto.findByIdAndUpdate(productoId, { $inc: { stock: -params.cant } }, { new: true }, (err, aumento) => {
                })
            }
        })
        
    }
}*/

function listProductos(req, res) {
    var userId = req.user.sub;

    Producto.find({empresa: userId}, (err, productos) => {
        if (err) {
            return res.status(500).send({ message: 'Error general'})
        }else if (productos){
            return res.status(200).send({ message: 'Productos Encontrados: ', productos: productos})
        }else{
            return res.status(500).send({ message: 'no se encontraron productos'})
        }
    })
}

function searchProductos(req, res) {

}

module.exports = {
    setProducto,
    listProductos
    //simuVenta
}