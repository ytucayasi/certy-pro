const PEE = require('../models/Pee');
const {
  crearPEE,
  obtenerTodosPEE,
  obtenerPEE,
  actualizarPEE,
  eliminarPEE,
  obtenerTodosLosPEE,
  obtenerPEEConEstudiantePorId
} = require('../repositories/peeRepository');

const crearNuevoPEE = (req, res) => {
  const { estudiante_id, plan_estudio_id } = req.body;
  const nuevoPEE = new PEE(null, estudiante_id, plan_estudio_id);
  
  crearPEE(nuevoPEE, (err, result) => {
    if (err) {
      console.error('Error al crear PEE:', err);
      res.status(500).json({ message: 'Error al crear PEE' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosPEENormal = (req, res) => {
  obtenerTodosPEE((err, results) => {
    if (err) {
      console.error('Error al obtener PEEs:', err);
      res.status(500).json({ message: 'Error al obtener PEEs' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerTodosLosPEEMejorado = (req, res) => {
  obtenerTodosLosPEE((err, results) => {
    if (err) {
      console.error('Error al obtener PEEs:', err);
      res.status(500).json({ message: 'Error al obtener PEEs' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerPEEConEstudiantePorIdMejorado = (req, res) => {
  const peeId = req.params.id;

  obtenerPEEConEstudiantePorId(peeId, (err, result) => {
    if (err) {
      console.error(`Error al obtener PEE con ID ${peeId}:`, err);
      res.status(500).json({ message: `Error al obtener PEE con ID ${peeId}` });
      return;
    }

    if (!result) {
      res.status(404).json({ message: `PEE con ID ${peeId} no encontrado` });
      return;
    }

    res.status(200).json(result);
  });
};

const obtenerPEEPorId = (req, res) => {
  const peeId = req.params.id;
  obtenerPEE(peeId, (err, result) => {
    if (err) {
      console.error('Error al obtener PEE:', err);
      res.status(500).json({ message: 'Error al obtener PEE' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'PEE no encontrado' });
    } else {
      const peeConId = { id: peeId, ...result };
      res.status(200).json(peeConId);
    }
  });
};

const actualizarPEEPorId = (req, res) => {
  const peeId = req.params.id;
  const { estudiante_id, plan_estudio_id } = req.body;
  const peeActualizado = new PEE(peeId, estudiante_id, plan_estudio_id);
  
  actualizarPEE(peeActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar PEE:', err);
      res.status(500).json({ message: 'Error al actualizar PEE' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'PEE no encontrado' });
    } else {
      res.status(200).json({ message: 'PEE actualizado correctamente' });
    }
  });
};

const eliminarPEEPorId = (req, res) => {
  const peeId = req.params.id;
  eliminarPEE(peeId, (err, result) => {
    if (err) {
      console.error('Error al eliminar RPEEU:', err);
      res.status(500).json({ message: 'Error al eliminar PEE' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'PEE no encontrado' });
    } else {
      res.status(200).json({ message: 'PEE eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoPEE,
  obtenerTodosLosPEENormal,
  obtenerPEEPorId,
  actualizarPEEPorId,
  eliminarPEEPorId,
  obtenerTodosLosPEEMejorado,
  obtenerPEEConEstudiantePorIdMejorado
};