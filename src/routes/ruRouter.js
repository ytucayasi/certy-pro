const express = require('express');
const ruController = require('../controllers/ruController.js');

const router = express.Router();

router.get('/ru', ruController.obtenerTodosLosRU);
router.post('/ru', ruController.crearNuevoRU);
router.get('/ru/:id', ruController.obtenerRUPorId);
router.put('/ru/:id', ruController.actualizarRUPorId);
router.delete('/ru/:id', ruController.eliminarRUPorId);

module.exports = router;