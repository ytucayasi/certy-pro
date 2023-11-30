const express = require('express');
const pepeController = require('../controllers/pepeController.js');

const router = express.Router();

router.get('/pepe', pepeController.obtenerTodosLosPEPE);
router.get('/pepe-programas/:planEstudioId', pepeController.obtenerProgramasPorPlanController);
router.get('/pepe-programa/:programaId', pepeController.obtenerEstadoYNombreController);
router.post('/pepe', pepeController.crearNuevoPEPE);
router.get('/pepe/:id', pepeController.obtenerPEPEPorId);
router.put('/pepe/:id', pepeController.actualizarPEPEPorId);
router.delete('/pepe/:id', pepeController.eliminarPEPEPorId);

module.exports = router;