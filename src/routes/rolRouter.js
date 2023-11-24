const express = require('express');
const rolController = require('../controllers/rolController.js');

const router = express.Router();

router.get('/roles', rolController.obtenerTodosLosRoles);
router.post('/roles', rolController.crearNuevoRol);
router.get('/roles/:id', rolController.obtenerRolPorId);
router.put('/roles/:id', rolController.actualizarRolPorId);
router.delete('/roles/:id', rolController.eliminarRolPorId);

module.exports = router;