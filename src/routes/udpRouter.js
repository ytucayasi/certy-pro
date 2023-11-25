const express = require('express');
const udpController = require('../controllers/udpController.js');

const router = express.Router();

router.get('/udp', udpController.obtenerTodosLosUDP);
router.post('/udp', udpController.crearNuevoUDP);
router.get('/udp/:id', udpController.obtenerUDPPorId);
router.put('/udp/:id', udpController.actualizarUDPPorId);
router.delete('/udp/:id', udpController.eliminarUDPPorId);

module.exports = router;