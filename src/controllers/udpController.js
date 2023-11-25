const UDP = require('../models/Udp');
const {
  crearUDP,
  obtenerTodosUDP,
  obtenerUDP,
  actualizarUDP,
  eliminarUDP
} = require('../repositories/udpRepository');

const crearNuevoUDP = (req, res) => {
  const { unidad_didactica_id, periodo_id } = req.body;
  const nuevoUDP = new UDP(null, unidad_didactica_id, periodo_id);
  
  crearUDP(nuevoUDP, (err, result) => {
    if (err) {
      console.error('Error al crear UDP:', err);
      res.status(500).json({ message: 'Error al crear UDP' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosUDP = (req, res) => {
  obtenerTodosUDP((err, results) => {
    if (err) {
      console.error('Error al obtener UDPs:', err);
      res.status(500).json({ message: 'Error al obtener UDPs' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerUDPPorId = (req, res) => {
  const udpId = req.params.id;
  obtenerUDP(udpId, (err, result) => {
    if (err) {
      console.error('Error al obtener UDP:', err);
      res.status(500).json({ message: 'Error al obtener UDP' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'UDP no encontrado' });
    } else {
      const udpConId = { id: udpId, ...result };
      res.status(200).json(udpConId);
    }
  });
};

const actualizarUDPPorId = (req, res) => {
  const udpId = req.params.id;
  const { unidad_didactica_id, periodo_id } = req.body;
  const udpActualizado = new UDP(udpId, unidad_didactica_id, periodo_id);
  
  actualizarUDP(udpActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar UDP:', err);
      res.status(500).json({ message: 'Error al actualizar UDP' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'UDP no encontrado' });
    } else {
      res.status(200).json({ message: 'UDP actualizado correctamente' });
    }
  });
};

const eliminarUDPPorId = (req, res) => {
  const udpId = req.params.id;
  eliminarUDP(udpId, (err, result) => {
    if (err) {
      console.error('Error al eliminar UDP:', err);
      res.status(500).json({ message: 'Error al eliminar UDP' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'UDP no encontrado' });
    } else {
      res.status(200).json({ message: 'UDP eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoUDP,
  obtenerTodosLosUDP,
  obtenerUDPPorId,
  actualizarUDPPorId,
  eliminarUDPPorId
};