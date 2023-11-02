const express = require('express');
const certificadoController = require('../controllers/certificadoController.js');

const router = express.Router();

router.get('/certificados', certificadoController.obtenerTodosLosCertificados);
router.post('/certificados', certificadoController.crearNuevoCertificado);
router.get('/certificados/:id', certificadoController.obtenerCertificadoPorId);
router.put('/certificados/:id', certificadoController.actualizarCertificadoPorId);
router.delete('/certificados/:id', certificadoController.eliminarCertificadoPorId);

module.exports = router;
