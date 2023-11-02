const Ins = require('../models/Ins');
const {
  crearIns,
  obtenerTodosIns,
  obtenerIns,
  actualizarIns,
  eliminarIns
} = require('../repositories/insRepository');

const crearNuevaIns = (req, res) => {
  const nuevaIns = new Ins(req.body);
  crearIns(nuevaIns, (err, result) => {
    if (err) {
      console.error('Error al crear una ins:', err);
      res.status(500).json({ message: 'Error al crear una ins' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodasIns = (req, res) => {
  obtenerTodosIns((err, results) => {
    if (err) {
      console.error('Error al obtener elementos:', err);
      res.status(500).json({ message: 'Error al obtener elementos' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerInsPorId = (req, res) => {
  const insId = req.params.id;
  obtenerIns(insId, (err, result) => {
    if (err) {
      console.error('Error al obtener una ins:', err);
      res.status(500).json({ message: 'Error al obtener una ins' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Ins no encontrada' });
    } else {
      const insConId = { id: insId, ...result };
      res.status(200).json(insConId);
    }
  });
};

const actualizarInsPorId = (req, res) => {
  const insId = req.params.id;
  const insActualizada = new Ins(req.body);
  actualizarIns(insId, insActualizada, (err, result) => {
    if (err) {
      console.error('Error al actualizar una ins:', err);
      res.status(500).json({ message: 'Error al actualizar una ins' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Ins no encontrada' });
    } else {
      res.status(200).json({ message: 'Ins actualizada correctamente' });
    }
  });
};

const eliminarInsPorId = (req, res) => {
  const insId = req.params.id;
  eliminarIns(insId, (err, result) => {
    if (err) {
      console.error('Error al eliminar una ins:', err);
      res.status(500).json({ message: 'Error al eliminar una ins' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Ins no encontrada' });
    } else {
      res.status(200).json({ message: 'Ins eliminada correctamente' });
    }
  });
};

module.exports = {
  crearNuevaIns,
  obtenerTodasIns,
  obtenerInsPorId,
  actualizarInsPorId,
  eliminarInsPorId
};