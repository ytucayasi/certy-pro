const express = require('express');
const prController = require('../controllers/prController.js');

const router = express.Router();

router.get('/pr', prController.obtenerTodosLosPR);
router.post('/pr', prController.crearNuevoPR);
router.get('/pr/:id', prController.obtenerPRPorId);
router.put('/pr/:id', prController.actualizarPRPorId);
router.delete('/pr/:id', prController.eliminarPRPorId);

module.exports = router;
