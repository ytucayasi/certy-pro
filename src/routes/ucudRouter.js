const express = require('express');
const ucudController = require('../controllers/ucudController.js');

const router = express.Router();

router.get('/ucud', ucudController.obtenerTodosLosUCUD);
router.post('/ucud', ucudController.crearNuevoUCUD);
router.get('/ucud/:id', ucudController.obtenerUCUDPorId);
router.put('/ucud/:id', ucudController.actualizarUCUDPorId);
router.delete('/ucud/:id', ucudController.eliminarUCUDPorId);

module.exports = router;