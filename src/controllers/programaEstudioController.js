const ProgramaEstudio = require('../models/ProgramaEstudio');
const {
  crearProgramaEstudio,
  obtenerTodosProgramasEstudio,
  obtenerProgramaEstudio,
  actualizarProgramaEstudio,
  eliminarProgramaEstudio
} = require('../repositories/programaEstudioRepository');

const crearNuevoProgramaEstudio = (req, res) => {
  const { nombre } = req.body;
  const nuevoProgramaEstudio = new ProgramaEstudio({ id: null, nombre });
  
  crearProgramaEstudio(nuevoProgramaEstudio, (err, result) => {
    if (err) {
      console.error('Error al crear programa de estudio:', err);
      res.status(500).json({ message: 'Error al crear programa de estudio' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosProgramasEstudio = (req, res) => {
  obtenerTodosProgramasEstudio((err, results) => {
    if (err) {
      console.error('Error al obtener programas de estudio:', err);
      res.status(500).json({ message: 'Error al obtener programas de estudio' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerProgramaEstudioPorId = (req, res) => {
  const programaEstudioId = req.params.id;
  obtenerProgramaEstudio(programaEstudioId, (err, result) => {
    if (err) {
      console.error('Error al obtener programa de estudio:', err);
      res.status(500).json({ message: 'Error al obtener programa de estudio' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'programa de estudio no encontrado' });
    } else {
      const ProgramaEstudioConId = { id: programaEstudioId, ...result };
      res.status(200).json(ProgramaEstudioConId);
    }
  });
};

const actualizarProgramaEstudioPorId = (req, res) => {
  const programaEstudioId = req.params.id;
  const programaEstudioActualizado = new ProgramaEstudio(req.body);
  
  actualizarProgramaEstudio(programaEstudioId, programaEstudioActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar programa de estudio:', err);
      res.status(500).json({ message: 'Error al actualizar programa de estudio' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'programa de estudio no encontrado' });
    } else {
      res.status(200).json({ message: 'programa de estudio actualizado correctamente' });
    }
  });
};

const eliminarProgramaEstudioPorId = (req, res) => {
  const programaEstudioId = req.params.id;
  eliminarProgramaEstudio(programaEstudioId, (err, result) => {
    if (err) {
      console.error('Error al eliminar programa de estudio:', err);
      res.status(500).json({ message: 'Error al eliminar programa de estudio' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'programa de estudio no encontrado' });
    } else {
      res.status(200).json({ message: 'programa de estudio eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoProgramaEstudio,
  obtenerTodosLosProgramasEstudio,
  obtenerProgramaEstudioPorId,
  actualizarProgramaEstudioPorId,
  eliminarProgramaEstudioPorId
};
