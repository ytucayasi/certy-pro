const express = require('express');
const peeController = require('../controllers/peeController.js');

const router = express.Router();

router.get('/pee', peeController.obtenerTodosLosPEENormal);
router.get('/pee-mejorado', peeController.obtenerTodosLosPEEMejorado);
router.get('/pee-mejorado/:id', peeController.obtenerPEEConEstudiantePorIdMejorado);
router.post('/pee', peeController.crearNuevoPEE);
router.get('/pee/:id', peeController.obtenerPEEPorId);
router.put('/pee/:id', peeController.actualizarPEEPorId);
router.delete('/pee/:id', peeController.eliminarPEEPorId);

module.exports = router;