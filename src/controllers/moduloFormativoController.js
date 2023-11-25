const ModuloFormativo = require('../models/ModuloFormativo');
const {
  crearModuloFormativo,
  obtenerTodosModulosFormativo,
  obtenerModuloFormativo,
  actualizarModuloFormativo,
  eliminarModuloFormativo
} = require('../repositories/moduloFormativoRepository');

const crearNuevoModuloFormativo = (req, res) => {
  const { nombre } = req.body;
  const nuevoModuloFormativo = new ModuloFormativo({ id: null, nombre });
  
  crearModuloFormativo(nuevoModuloFormativo, (err, result) => {
    if (err) {
      console.error('Error al crear modulo formativo:', err);
      res.status(500).json({ message: 'Error al crear modulo formativo' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosModulosFormativo = (req, res) => {
  obtenerTodosModulosFormativo((err, results) => {
    if (err) {
      console.error('Error al obtener modulos formativos:', err);
      res.status(500).json({ message: 'Error al obtener modulos formativos' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerModuloFormativoPorId = (req, res) => {
  const moduloFormativoId = req.params.id;
  obtenerModuloFormativo(moduloFormativoId, (err, result) => {
    if (err) {
      console.error('Error al obtener modulo formativo:', err);
      res.status(500).json({ message: 'Error al obtener modulo formativo' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Modulo formativo no encontrado' });
    } else {
      const moduloFormativoConId = { id: moduloFormativoId, ...result };
      res.status(200).json(moduloFormativoConId);
    }
  });
};

const actualizarModuloFormativoPorId = (req, res) => {
  const moduloFormativoId = req.params.id;
  const moduloFormativoActualizado = new ModuloFormativo(req.body);
  
  actualizarModuloFormativo(moduloFormativoId, moduloFormativoActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar modulo formativo:', err);
      res.status(500).json({ message: 'Error al actualizar modulo formativo' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Modulo formativo no encontrado' });
    } else {
      res.status(200).json({ message: 'Modulo formativo actualizado correctamente' });
    }
  });
};

const eliminarModuloFormativoPorId = (req, res) => {
  const moduloFormativoId = req.params.id;
  eliminarModuloFormativo(moduloFormativoId, (err, result) => {
    if (err) {
      console.error('Error al eliminar modulo formativo:', err);
      res.status(500).json({ message: 'Error al eliminar modulo formativo' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Modulo formativo no encontrado' });
    } else {
      res.status(200).json({ message: 'Modulo formativo eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoModuloFormativo,
  obtenerTodosLosModulosFormativo,
  obtenerModuloFormativoPorId,
  actualizarModuloFormativoPorId,
  eliminarModuloFormativoPorId
};
