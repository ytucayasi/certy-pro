const MFUC = require('../models/Mfuc');
const {
  crearMFUC,
  obtenerTodosMFUC,
  obtenerMFUC,
  actualizarMFUC,
  eliminarMFUC
} = require('../repositories/mfucRepository');

const crearNuevoMFUC = (req, res) => {
  const { modulo_formativo_id, unidad_competencia_id } = req.body;
  const nuevoMFUC = new MFUC(null, modulo_formativo_id, unidad_competencia_id);
  
  crearMFUC(nuevoMFUC, (err, result) => {
    if (err) {
      console.error('Error al crear MFUC:', err);
      res.status(500).json({ message: 'Error al crear MFUC' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosMFUC = (req, res) => {
  obtenerTodosMFUC((err, results) => {
    if (err) {
      console.error('Error al obtener MFUCs:', err);
      res.status(500).json({ message: 'Error al obtener MFUCs' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerMFUCPorId = (req, res) => {
  const mfucId = req.params.id;
  obtenerMFUC(mfucId, (err, result) => {
    if (err) {
      console.error('Error al obtener MFUC:', err);
      res.status(500).json({ message: 'Error al obtener MFUC' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'MFUC no encontrado' });
    } else {
      const mfucConId = { id: mfucId, ...result };
      res.status(200).json(mfucConId);
    }
  });
};

const actualizarMFUCPorId = (req, res) => {
  const mfucId = req.params.id;
  const { modulo_formativo_id, unidad_competencia_id } = req.body;
  const mfucActualizado = new MFUC(mfucId, modulo_formativo_id, unidad_competencia_id);
  
  actualizarMFUC(mfucActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar MFUC:', err);
      res.status(500).json({ message: 'Error al actualizar MFUC' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'MFUC no encontrado' });
    } else {
      res.status(200).json({ message: 'MFUC actualizado correctamente' });
    }
  });
};

const eliminarMFUCPorId = (req, res) => {
  const mfucId = req.params.id;
  eliminarMFUC(mfucId, (err, result) => {
    if (err) {
      console.error('Error al eliminar MFUC:', err);
      res.status(500).json({ message: 'Error al eliminar MFUC' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'MFUC no encontrado' });
    } else {
      res.status(200).json({ message: 'MFUC eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoMFUC,
  obtenerTodosLosMFUC,
  obtenerMFUCPorId,
  actualizarMFUCPorId,
  eliminarMFUCPorId
};