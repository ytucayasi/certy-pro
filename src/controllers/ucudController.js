const UCUD = require('../models/Ucud');
const {
  crearUCUD,
  obtenerTodosUCUD,
  obtenerUCUD,
  actualizarUCUD,
  eliminarUCUD
} = require('../repositories/ucudRepository');

const crearNuevoUCUD = (req, res) => {
  const { unidad_competencia_id, unidad_didactica_id } = req.body;
  const nuevoUCUD = new UCUD(null, unidad_competencia_id, unidad_didactica_id);
  
  crearUCUD(nuevoUCUD, (err, result) => {
    if (err) {
      console.error('Error al crear UCUD:', err);
      res.status(500).json({ message: 'Error al crear UCUD' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosUCUD = (req, res) => {
  obtenerTodosUCUD((err, results) => {
    if (err) {
      console.error('Error al obtener UCUDs:', err);
      res.status(500).json({ message: 'Error al obtener UCUDs' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerUCUDPorId = (req, res) => {
  const ucudId = req.params.id;
  obtenerUCUD(ucudId, (err, result) => {
    if (err) {
      console.error('Error al obtener UCUD:', err);
      res.status(500).json({ message: 'Error al obtener UCUD' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'UCUD no encontrado' });
    } else {
      const ucudConId = { id: ucudId, ...result };
      res.status(200).json(ucudConId);
    }
  });
};

const actualizarUCUDPorId = (req, res) => {
  const ucudId = req.params.id;
  const { unidad_competencia_id, unidad_didactica_id } = req.body;
  const ucudActualizado = new UCUD(ucudId, unidad_competencia_id, unidad_didactica_id);
  
  actualizarUCUD(ucudActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar UCUD:', err);
      res.status(500).json({ message: 'Error al actualizar UCUD' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'UCUD no encontrado' });
    } else {
      res.status(200).json({ message: 'UCUD actualizado correctamente' });
    }
  });
};

const eliminarUCUDPorId = (req, res) => {
  const ucudId = req.params.id;
  eliminarUCUD(ucudId, (err, result) => {
    if (err) {
      console.error('Error al eliminar UCUD:', err);
      res.status(500).json({ message: 'Error al eliminar UCUD' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'UCUD no encontrado' });
    } else {
      res.status(200).json({ message: 'UCUD eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoUCUD,
  obtenerTodosLosUCUD,
  obtenerUCUDPorId,
  actualizarUCUDPorId,
  eliminarUCUDPorId
};