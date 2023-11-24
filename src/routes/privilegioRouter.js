const express = require('express');
const privilegioController = require('../controllers/privilegioController.js');

const router = express.Router();

router.get('/privilegios', privilegioController.obtenerTodosLosPrivilegios);
router.post('/privilegios', privilegioController.crearNuevoPrivilegio);
router.get('/privilegios/:id', privilegioController.obtenerPrivilegioPorId);
router.put('/privilegios/:id', privilegioController.actualizarPrivilegioPorId);
router.delete('/privilegios/:id', privilegioController.eliminarPrivilegioPorId);

module.exports = router;