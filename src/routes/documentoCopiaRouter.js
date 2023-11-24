const express = require('express');
const documentoCopiaController = require('../controllers/documentoCopiaController.js');

const router = express.Router();

router.get('/documento_copia', documentoCopiaController.obtenerTodosLosDocumentosCopia);
router.post('/documento_copia', documentoCopiaController.crearNuevoDocumentoCopia);
router.get('/documento_copia/:id', documentoCopiaController.obtenerDocumentoCopiaPorId);
router.put('/documento_copia/:id', documentoCopiaController.actualizarDocumentoCopiaPorId);
router.delete('/documento_copia/:id', documentoCopiaController.eliminarDocumentoCopiaPorId);

module.exports = router;
