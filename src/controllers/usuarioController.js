const Usuario = require('../models/Usuario');
const {
  crearUsuario,
  obtenerTodos,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require('../repositories/usuarioRepository');

// Función para crear un nuevo usuario
const crearNuevoUsuario = (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  crearUsuario(nuevoUsuario, (err, result) => {
    if (err) {
      console.error('Error al crear un usuario:', err);
      res.status(500).json({ message: 'Error al crear un usuario' });
      return;
    }
    res.status(201).json(result);
  });
};

// Función para obtener todos los usuarios
const obtenerTodosLosUsuarios = (req, res) => {
  obtenerTodos((err, results) => {
    if (err) {
      console.error('Error al obtener elementos:', err);
      res.status(500).json({ message: 'Error al obtener elementos' });
      return;
    }
    res.status(200).json(results);
  });
};

// Función para obtener un usuario por ID
const obtenerUsuarioPorId = (req, res) => {
  const userId = req.params.id;
  obtenerUsuario(userId, (err, result) => {
    if (err) {
      console.error('Error al obtener un usuario:', err);
      res.status(500).json({ message: 'Error al obtener un usuario' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      const usuarioConId = { id: userId, ...result };
      res.status(200).json(usuarioConId);
    }
  });
};

// Función para actualizar un usuario por ID
const actualizarUsuarioPorId = (req, res) => {
  const userId = req.params.id;
  const usuarioActualizado = new Usuario(req.body);
  actualizarUsuario(userId, usuarioActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar un usuario:', err);
      res.status(500).json({ message: 'Error al actualizar un usuario' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    }
  });
};

// Función para eliminar un usuario por ID
const eliminarUsuarioPorId = (req, res) => {
  const userId = req.params.id;
  eliminarUsuario(userId, (err, result) => {
    if (err) {
      console.error('Error al eliminar un usuario:', err);
      res.status(500).json({ message: 'Error al eliminar un usuario' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuarioPorId,
  eliminarUsuarioPorId
};