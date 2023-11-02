const express = require('express');
const estudianteController = require('../controllers/estudianteController.js');

const router = express.Router();

router.get('/estudiantes', estudianteController.obtenerTodosLosEstudiantes);
router.post('/estudiantes', estudianteController.crearNuevoEstudiante);
router.get('/estudiantes/:id', estudianteController.obtenerEstudiantePorId);
router.put('/estudiantes/:id', estudianteController.actualizarEstudiantePorId);
router.delete('/estudiantes/:id', estudianteController.eliminarEstudiantePorId);

module.exports = router;