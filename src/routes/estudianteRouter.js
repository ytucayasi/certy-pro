const express = require('express');
const estudianteController = require('../controllers/estudianteController.js');

const router = express.Router();

router.get('/estudiantes', estudianteController.obtenerTodosLosEstudiantes);
router.get('/estudiantes-usuarios', estudianteController.obtenerEstudiantesConUsuarios);
router.get('/estudiantes-usuarios/:codigo', estudianteController.obtenerEstudianteUsuarioConCod);
router.post('/estudiantes', estudianteController.crearNuevoEstudiante);
router.post('/estudiantes-usuarios', estudianteController.crearNuevoEstudianteYUsuario);
router.put('/estudiantes-usuarios/:id', estudianteController.actualizarEstudianteYUsuario);
router.get('/estudiantes/:id', estudianteController.obtenerEstudiantePorId);
router.put('/estudiantes/:id', estudianteController.actualizarEstudiantePorId);
router.delete('/estudiantes/:id', estudianteController.eliminarEstudiantePorId);

module.exports = router;
