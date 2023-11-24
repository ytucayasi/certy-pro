const Rol = require('../models/Rol');
const rolRepository = require('../repositories/rolRepository');

const crearNuevoRol = (req, res) => {
  const nuevoRol = new Rol(req.body);
  rolRepository.crearRol(nuevoRol, (err, result) => {
    if (err) {
      console.error('Error al crear un rol:', err);
      res.status(500).json({ message: 'Error al crear un rol' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosRoles = (req, res) => {
  rolRepository.obtenerTodosRoles((err, results) => {
    if (err) {
      console.error('Error al obtener roles:', err);
      res.status(500).json({ message: 'Error al obtener roles' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerRolPorId = (req, res) => {
  const rolId = req.params.id;
  rolRepository.obtenerRol(rolId, (err, result) => {
    if (err) {
      console.error('Error al obtener un rol:', err);
      res.status(500).json({ message: 'Error al obtener un rol' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Rol no encontrado' });
    } else {
      const rolConId = { id: rolId, ...result };
      res.status(200).json(rolConId);
    }
  });
};

const actualizarRolPorId = (req, res) => {
  const rolId = req.params.id;
  const rolActualizado = new Rol(req.body);
  rolRepository.actualizarRol(rolId, rolActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar un rol:', err);
      res.status(500).json({ message: 'Error al actualizar un rol' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Rol no encontrado' });
    } else {
      res.status(200).json({ message: 'Rol actualizado correctamente' });
    }
  });
};

const eliminarRolPorId = (req, res) => {
  const rolId = req.params.id;
  rolRepository.eliminarRol(rolId, (err, result) => {
    if (err) {
      console.error('Error al eliminar un rol:', err);
      res.status(500).json({ message: 'Error al eliminar un rol' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Rol no encontrado' });
    } else {
      res.status(200).json({ message: 'Rol eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoRol,
  obtenerTodosLosRoles,
  obtenerRolPorId,
  actualizarRolPorId,
  eliminarRolPorId
};
