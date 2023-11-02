const express = require('express');
const insController = require('../controllers/insController.js');

const router = express.Router();

router.get('/ins', insController.obtenerTodasIns);
router.post('/ins', insController.crearNuevaIns);
router.get('/ins/:id', insController.obtenerInsPorId);
router.put('/ins/:id', insController.actualizarInsPorId);
router.delete('/ins/:id', insController.eliminarInsPorId);

module.exports = router;