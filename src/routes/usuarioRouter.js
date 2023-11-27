const express = require('express');
const usuarioController = require('../controllers/usuarioController.js');

const router = express.Router();

router.get('/usuarios', usuarioController.obtenerTodosLosUsuarios);

router.post('/usuarios', usuarioController.crearNuevoUsuario);

router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);

router.put('/usuarios/:id', usuarioController.actualizarUsuarioPorId);

router.delete('/usuarios/:id', usuarioController.eliminarUsuarioPorId);

router.post('/login', usuarioController.iniciarSesion);

module.exports = router;