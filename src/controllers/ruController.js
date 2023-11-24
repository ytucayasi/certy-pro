const RU = require('../models/Ru');
const {
  crearRU,
  obtenerTodosRU,
  obtenerRU,
  actualizarRU,
  eliminarRU
} = require('../repositories/ruRepository');

const crearNuevoRU = (req, res) => {
  const { rol_id, usuario_id } = req.body;
  const nuevoRU = new RU(null, rol_id, usuario_id);
  
  crearRU(nuevoRU, (err, result) => {
    if (err) {
      console.error('Error al crear RU:', err);
      res.status(500).json({ message: 'Error al crear RU' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosRU = (req, res) => {
  obtenerTodosRU((err, results) => {
    if (err) {
      console.error('Error al obtener RUs:', err);
      res.status(500).json({ message: 'Error al obtener RUs' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerRUPorId = (req, res) => {
  const ruId = req.params.id;
  obtenerRU(ruId, (err, result) => {
    if (err) {
      console.error('Error al obtener RU:', err);
      res.status(500).json({ message: 'Error al obtener RU' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'RU no encontrado' });
    } else {
      const ruConId = { id: ruId, ...result };
      res.status(200).json(ruConId);
    }
  });
};

const actualizarRUPorId = (req, res) => {
  const ruId = req.params.id;
  const { rol_id, usuario_id } = req.body;
  const ruActualizado = new RU(ruId, rol_id, usuario_id);
  
  actualizarRU(ruActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar RU:', err);
      res.status(500).json({ message: 'Error al actualizar RU' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'RU no encontrado' });
    } else {
      res.status(200).json({ message: 'RU actualizado correctamente' });
    }
  });
};

const eliminarRUPorId = (req, res) => {
  const ruId = req.params.id;
  eliminarRU(ruId, (err, result) => {
    if (err) {
      console.error('Error al eliminar RU:', err);
      res.status(500).json({ message: 'Error al eliminar RU' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'RU no encontrado' });
    } else {
      res.status(200).json({ message: 'RU eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoRU,
  obtenerTodosLosRU,
  obtenerRUPorId,
  actualizarRUPorId,
  eliminarRUPorId
};