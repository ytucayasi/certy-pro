const PEMF = require('../models/Pemf');
const {
  crearPEMF,
  obtenerTodosPEMF,
  obtenerPEMF,
  actualizarPEMF,
  eliminarPEMF
} = require('../repositories/pemfRepository');

const crearNuevoPEMF = (req, res) => {
  const { programa_estudio_id, modulo_formativo_id } = req.body;
  const nuevoPEMF = new PEMF(null, programa_estudio_id, modulo_formativo_id);
  
  crearPEMF(nuevoPEMF, (err, result) => {
    if (err) {
      console.error('Error al crear PEMF:', err);
      res.status(500).json({ message: 'Error al crear PEMF' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosPEMF = (req, res) => {
  obtenerTodosPEMF((err, results) => {
    if (err) {
      console.error('Error al obtener PEMFs:', err);
      res.status(500).json({ message: 'Error al obtener PEMFs' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerPEMFPorId = (req, res) => {
  const pemfId = req.params.id;
  obtenerPEMF(pemfId, (err, result) => {
    if (err) {
      console.error('Error al obtener PEMF:', err);
      res.status(500).json({ message: 'Error al obtener PEMF' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'PEMF no encontrado' });
    } else {
      const pemfConId = { id: pemfId, ...result };
      res.status(200).json(pemfConId);
    }
  });
};

const actualizarPEMFPorId = (req, res) => {
  const pemfId = req.params.id;
  const { programa_estudio_id, modulo_formativo_id } = req.body;
  const pemfActualizado = new PEMF(pemfId, programa_estudio_id, modulo_formativo_id);
  
  actualizarPEMF(pemfActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar PEMF:', err);
      res.status(500).json({ message: 'Error al actualizar PEMF' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'PEMF no encontrado' });
    } else {
      res.status(200).json({ message: 'PEMF actualizado correctamente' });
    }
  });
};

const eliminarPEMFPorId = (req, res) => {
  const pemfId = req.params.id;
  eliminarPEMF(pemfId, (err, result) => {
    if (err) {
      console.error('Error al eliminar PEMF:', err);
      res.status(500).json({ message: 'Error al eliminar PEMF' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'PEMF no encontrado' });
    } else {
      res.status(200).json({ message: 'PEMF eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoPEMF,
  obtenerTodosLosPEMF,
  obtenerPEMFPorId,
  actualizarPEMFPorId,
  eliminarPEMFPorId
};