const express = require('express');
const nivelAcademicoController = require('../controllers/nivelAcademicoController.js');

const router = express.Router();

router.get('/niveles-academicos', nivelAcademicoController.obtenerTodosLosNivelesAcademicos);
router.post('/niveles-academicos', nivelAcademicoController.crearNuevoNivelAcademico);
router.get('/niveles-academicos/:id', nivelAcademicoController.obtenerNivelAcademicoPorId);
router.put('/niveles-academicos/:id', nivelAcademicoController.actualizarNivelAcademicoPorId);
router.delete('/niveles-academicos/:id', nivelAcademicoController.eliminarNivelAcademicoPorId);

module.exports = router;
