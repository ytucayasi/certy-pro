const Privilegio = require('../models/Privilegio');
const {
  crearPrivilegio,
  obtenerTodosPrivilegios,
  obtenerPrivilegio,
  actualizarPrivilegio,
  eliminarPrivilegio
} = require('../repositories/privilegioRepository');

const crearNuevoPrivilegio = (req, res) => {
  const nuevoPrivilegio = new Privilegio(req.body);
  crearPrivilegio(nuevoPrivilegio, (err, result) => {
    if (err) {
      console.error('Error al crear un privilegio:', err);
      res.status(500).json({ message: 'Error al crear un privilegio' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosPrivilegios = (req, res) => {
  obtenerTodosPrivilegios((err, results) => {
    if (err) {
      console.error('Error al obtener elementos:', err);
      res.status(500).json({ message: 'Error al obtener elementos' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerPrivilegioPorId = (req, res) => {
  const privilegioId = req.params.id;
  obtenerPrivilegio(privilegioId, (err, result) => {
    if (err) {
      console.error('Error al obtener un privilegio:', err);
      res.status(500).json({ message: 'Error al obtener un privilegio' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Privilegio no encontrado' });
    } else {
      const privilegioConId = { id: privilegioId, ...result };
      res.status(200).json(privilegioConId);
    }
  });
};

const actualizarPrivilegioPorId = (req, res) => {
  const privilegioId = req.params.id;
  const privilegioActualizado = new Privilegio(req.body);
  actualizarPrivilegio(privilegioId, privilegioActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar un privilegio:', err);
      res.status(500).json({ message: 'Error al actualizar un privilegio' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Privilegio no encontrado' });
    } else {
      res.status(200).json({ message: 'Privilegio actualizado correctamente' });
    }
  });
};

const eliminarPrivilegioPorId = (req, res) => {
  const privilegioId = req.params.id;
  eliminarPrivilegio(privilegioId, (err, result) => {
    if (err) {
      console.error('Error al eliminar un privilegio:', err);
      res.status(500).json({ message: 'Error al eliminar un privilegio' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Privilegio no encontrado' });
    } else {
      res.status(200).json({ message: 'Privilegio eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoPrivilegio,
  obtenerTodosLosPrivilegios,
  obtenerPrivilegioPorId,
  actualizarPrivilegioPorId,
  eliminarPrivilegioPorId
};
