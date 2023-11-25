const express = require('express');
const planEstudioController = require('../controllers/planEstudioController.js');

const router = express.Router();

router.get('/planes_estudio', planEstudioController.obtenerTodosLosPlanesEstudio);
router.post('/planes_estudio', planEstudioController.crearNuevoPlanEstudio);
router.get('/planes_estudio/:id', planEstudioController.obtenerPlanEstudioPorId);
router.put('/planes_estudio/:id', planEstudioController.actualizarPlanEstudioPorId);
router.delete('/planes_estudio/:id', planEstudioController.eliminarPlanEstudioPorId);

module.exports = router;
