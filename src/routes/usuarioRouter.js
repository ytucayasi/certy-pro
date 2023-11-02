const express = require('express');
const usuarioController = require('../controllers/usuarioController.js');

const router = express.Router();

// Obtener todos los usuarios
router.get('/usuarios', usuarioController.obtenerTodosLosUsuarios);

// Crear un nuevo usuario
router.post('/usuarios', usuarioController.crearNuevoUsuario);

// Obtener un usuario por ID
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);

// Actualizar un usuario por ID
router.put('/usuarios/:id', usuarioController.actualizarUsuarioPorId);

// Eliminar un usuario por ID
router.delete('/usuarios/:id', usuarioController.eliminarUsuarioPorId);

module.exports = router;