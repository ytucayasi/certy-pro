const express = require('express');
const certificadoController = require('../controllers/certificadoController.js');

const router = express.Router();

router.get('/certificados/:id?', certificadoController.obtenerCertificadosControl);
router.post('/certificados', certificadoController.crearNuevoCertificadoMejorado);
router.put('/certificados/:id', certificadoController.actualizarCertificadoPorId);
router.delete('/certificados/:id', certificadoController.eliminarCertificadoPorId);
router.put('/certificados-documento/:id/', certificadoController.actualizarDocumentoDesdeCertificadoController);

module.exports = router;
