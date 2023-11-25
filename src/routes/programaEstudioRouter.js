const express = require('express');
const programaEstudioController = require('../controllers/programaEstudioController.js');

const router = express.Router();

router.get('/programas_estudio', programaEstudioController.obtenerTodosLosProgramasEstudio);
router.post('/programas_estudio', programaEstudioController.crearNuevoProgramaEstudio);
router.get('/programas_estudio/:id', programaEstudioController.obtenerProgramaEstudioPorId);
router.put('/programas_estudio/:id', programaEstudioController.actualizarProgramaEstudioPorId);
router.delete('/programas_estudio/:id', programaEstudioController.eliminarProgramaEstudioPorId);

module.exports = router;
