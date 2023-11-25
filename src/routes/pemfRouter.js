const express = require('express');
const pemfController = require('../controllers/pemfController.js');

const router = express.Router();

router.get('/pemf', pemfController.obtenerTodosLosPEMF);
router.post('/pemf', pemfController.crearNuevoPEMF);
router.get('/pemf/:id', pemfController.obtenerPEMFPorId);
router.put('/pemf/:id', pemfController.actualizarPEMFPorId);
router.delete('/pemf/:id', pemfController.eliminarPEMFPorId);

module.exports = router;