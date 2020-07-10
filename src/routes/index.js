var express = require('express');
var routers = express.Router();

var TamuController = require('./../Controllers/TamuController');
var { validationAddTamu } = require('./../Validations/ValidationTamu')


/* GET home page. */

routers.get('/tamu', TamuController.getAll);
routers.get('/tamu/:id', TamuController.getOne);
routers.post('/tamu', validationAddTamu, TamuController.store);
routers.patch('/tamu/:id', validationAddTamu, TamuController.update);
routers.delete('/tamu/:id', TamuController.delete);


module.exports = routers;