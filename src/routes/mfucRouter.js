const express = require('express');
const mfucController = require('../controllers/mfucController.js');

const router = express.Router();

router.get('/mfuc', mfucController.obtenerTodosLosMFUC);
router.post('/mfuc', mfucController.crearNuevoMFUC);
router.get('/mfuc/:id', mfucController.obtenerMFUCPorId);
router.put('/mfuc/:id', mfucController.actualizarMFUCPorId);
router.delete('/mfuc/:id', mfucController.eliminarMFUCPorId);

module.exports = router;