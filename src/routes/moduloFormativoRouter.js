const express = require('express');
const moduloFormativoController = require('../controllers/moduloFormativoController.js');

const router = express.Router();

router.get('/modulos_formativo', moduloFormativoController.obtenerTodosLosModulosFormativo);
router.post('/modulos_formativo', moduloFormativoController.crearNuevoModuloFormativo);
router.get('/modulos_formativo/:id', moduloFormativoController.obtenerModuloFormativoPorId);
router.put('/modulos_formativo/:id', moduloFormativoController.actualizarModuloFormativoPorId);
router.delete('/modulos_formativo/:id', moduloFormativoController.eliminarModuloFormativoPorId);

module.exports = router;
