const express = require('express');
const peeController = require('../controllers/peeController.js');

const router = express.Router();

router.get('/pee', peeController.obtenerTodosLosPEE);
router.post('/pee', peeController.crearNuevoPEE);
router.get('/pee/:id', peeController.obtenerPEEPorId);
router.put('/pee/:id', peeController.actualizarPEEPorId);
router.delete('/pee/:id', peeController.eliminarPEEPorId);

module.exports = router;