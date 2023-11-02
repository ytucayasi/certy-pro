const express = require('express');
const documentoController = require('../controllers/documentoController.js');

const router = express.Router();

router.get('/documentos', documentoController.obtenerTodosLosDocumentos);
router.post('/documentos', documentoController.crearNuevoDocumento);
router.get('/documentos/:id', documentoController.obtenerDocumentoPorId);
router.put('/documentos/:id', documentoController.actualizarDocumentoPorId);
router.delete('/documentos/:id', documentoController.eliminarDocumentoPorId);

module.exports = router;