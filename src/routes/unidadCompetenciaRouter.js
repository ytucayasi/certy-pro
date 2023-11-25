const express = require('express');
const unidadCompetenciaController = require('../controllers/unidadCompetenciaController.js');

const router = express.Router();

router.get('/unidades_competencia', unidadCompetenciaController.obtenerTodosLosUnidadesCompetencia);
router.post('/unidades_competencia', unidadCompetenciaController.crearNuevoUnidadCompetencia);
router.get('/unidades_competencia/:id', unidadCompetenciaController.obtenerUnidadCompetenciaPorId);
router.put('/unidades_competencia/:id', unidadCompetenciaController.actualizarUnidadCompetenciaPorId);
router.delete('/unidades_competencia/:id', unidadCompetenciaController.eliminarUnidadCompetenciaPorId);

module.exports = router;
