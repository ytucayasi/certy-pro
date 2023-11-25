const express = require('express');
const periodoController = require('../controllers/periodoController.js');

const router = express.Router();

router.get('/periodos', periodoController.obtenerTodosLosPeriodos);
router.post('/periodos', periodoController.crearNuevoPeriodo);
router.get('/periodos/:id', periodoController.obtenerPeriodoPorId);
router.put('/periodos/:id', periodoController.actualizarPeriodoPorId);
router.delete('/periodos/:id', periodoController.eliminarPeriodoPorId);

module.exports = router;
