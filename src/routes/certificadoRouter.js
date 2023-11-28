const express = require('express');
const certificadoController = require('../controllers/certificadoController.js');

const router = express.Router();

router.get('/certificados/:id?', certificadoController.obtenerCertificadosControl);
router.post('/certificados', certificadoController.crearNuevoCertificado);
router.put('/certificados/:id', certificadoController.actualizarCertificadoPorId);
router.delete('/certificados/:id', certificadoController.eliminarCertificadoPorId);

module.exports = router;
