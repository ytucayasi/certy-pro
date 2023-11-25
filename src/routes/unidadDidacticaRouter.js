const express = require('express');
const unidadDidacticaController = require('../controllers/unidadDidacticaController.js');

const router = express.Router();

router.get('/unidades_didactica', unidadDidacticaController.obtenerTodosLosUnidadesDidactica);
router.post('/unidades_didactica', unidadDidacticaController.crearNuevoUnidadDidactica);
router.get('/unidades_didactica/:id', unidadDidacticaController.obtenerUnidadDidacticaPorId);
router.put('/unidades_didactica/:id', unidadDidacticaController.actualizarUnidadDidacticaPorId);
router.delete('/unidades_didactica/:id', unidadDidacticaController.eliminarUnidadDidacticaPorId);

module.exports = router;
