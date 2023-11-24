const PR = require('../models/Pr');
const {
  crearPR,
  obtenerTodosPR,
  obtenerPR,
  actualizarPR,
  eliminarPR
} = require('../repositories/prRepository');

const crearNuevoPR = (req, res) => {
  const { privilegio_id, rol_id } = req.body;
  const nuevoPR = new PR(null, privilegio_id, rol_id);
  
  crearPR(nuevoPR, (err, result) => {
    if (err) {
      console.error('Error al crear PR:', err);
      res.status(500).json({ message: 'Error al crear PR' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosPR = (req, res) => {
  obtenerTodosPR((err, results) => {
    if (err) {
      console.error('Error al obtener PRs:', err);
      res.status(500).json({ message: 'Error al obtener PRs' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerPRPorId = (req, res) => {
  const prId = req.params.id;
  obtenerPR(prId, (err, result) => {
    if (err) {
      console.error('Error al obtener PR:', err);
      res.status(500).json({ message: 'Error al obtener PR' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'PR no encontrado' });
    } else {
      const prConId = { id: prId, ...result };
      res.status(200).json(prConId);
    }
  });
};

const actualizarPRPorId = (req, res) => {
  const prId = req.params.id;
  const { privilegio_id, rol_id } = req.body;
  const prActualizado = new PR(prId, privilegio_id, rol_id);
  
  actualizarPR(prActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar PR:', err);
      res.status(500).json({ message: 'Error al actualizar PR' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'PR no encontrado' });
    } else {
      res.status(200).json({ message: 'PR actualizado correctamente' });
    }
  });
};

const eliminarPRPorId = (req, res) => {
  const prId = req.params.id;
  eliminarPR(prId, (err, result) => {
    if (err) {
      console.error('Error al eliminar PR:', err);
      res.status(500).json({ message: 'Error al eliminar PR' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'PR no encontrado' });
    } else {
      res.status(200).json({ message: 'PR eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoPR,
  obtenerTodosLosPR,
  obtenerPRPorId,
  actualizarPRPorId,
  eliminarPRPorId
};
