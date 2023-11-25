const PEPE = require('../models/Pepe');
const {
  crearPEPE,
  obtenerTodosPEPE,
  obtenerPEPE,
  actualizarPEPE,
  eliminarPEPE
} = require('../repositories/pepeRepository');

const crearNuevoPEPE = (req, res) => {
  const { plan_estudio_id, programa_estudio_id } = req.body;
  const nuevoPEPE = new PEPE(null, plan_estudio_id, programa_estudio_id);
  
  crearPEPE(nuevoPEPE, (err, result) => {
    if (err) {
      console.error('Error al crear PEPE:', err);
      res.status(500).json({ message: 'Error al crear PEPE' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosPEPE = (req, res) => {
  obtenerTodosPEPE((err, results) => {
    if (err) {
      console.error('Error al obtener PEPEs:', err);
      res.status(500).json({ message: 'Error al obtener PEPEs' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerPEPEPorId = (req, res) => {
  const pepeId = req.params.id;
  obtenerPEPE(pepeId, (err, result) => {
    if (err) {
      console.error('Error al obtener PEPE:', err);
      res.status(500).json({ message: 'Error al obtener PEPE' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'PEPE no encontrado' });
    } else {
      const pepeConId = { id: pepeId, ...result };
      res.status(200).json(pepeConId);
    }
  });
};

const actualizarPEPEPorId = (req, res) => {
  const pepeId = req.params.id;
  const { plan_estudio_id, programa_estudio_id } = req.body;
  const pepeActualizado = new PEPE(pepeId, plan_estudio_id, programa_estudio_id);
  
  actualizarPEPE(pepeActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar PEPE:', err);
      res.status(500).json({ message: 'Error al actualizar PEPE' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'PEPE no encontrado' });
    } else {
      res.status(200).json({ message: 'PEPE actualizado correctamente' });
    }
  });
};

const eliminarPEPEPorId = (req, res) => {
  const pepeId = req.params.id;
  eliminarPEPE(pepeId, (err, result) => {
    if (err) {
      console.error('Error al eliminar PEPE:', err);
      res.status(500).json({ message: 'Error al eliminar PEPE' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'PEPE no encontrado' });
    } else {
      res.status(200).json({ message: 'PEPE eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoPEPE,
  obtenerTodosLosPEPE,
  obtenerPEPEPorId,
  actualizarPEPEPorId,
  eliminarPEPEPorId
};