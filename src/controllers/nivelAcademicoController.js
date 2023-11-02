const NivelAcademico = require('../models/NivelAcademico');
const {
  crearNivelAcademico,
  obtenerTodosNivelesAcademicos,
  obtenerNivelAcademico,
  actualizarNivelAcademico,
  eliminarNivelAcademico
} = require('../repositories/nivelAcademicoRepository');

const crearNuevoNivelAcademico = (req, res) => {
  const nuevoNivelAcademico = new NivelAcademico(req.body);
  crearNivelAcademico(nuevoNivelAcademico, (err, result) => {
    if (err) {
      console.error('Error al crear un nivel académico:', err);
      res.status(500).json({ message: 'Error al crear un nivel académico' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosNivelesAcademicos = (req, res) => {
  obtenerTodosNivelesAcademicos((err, results) => {
    if (err) {
      console.error('Error al obtener elementos:', err);
      res.status(500).json({ message: 'Error al obtener elementos' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerNivelAcademicoPorId = (req, res) => {
  const nivelAcademicoId = req.params.id;
  obtenerNivelAcademico(nivelAcademicoId, (err, result) => {
    if (err) {
      console.error('Error al obtener un nivel académico:', err);
      res.status(500).json({ message: 'Error al obtener un nivel académico' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Nivel académico no encontrado' });
    } else {
      const nivelAcademicoConId = { id: nivelAcademicoId, ...result };
      res.status(200).json(nivelAcademicoConId);
    }
  });
};

const actualizarNivelAcademicoPorId = (req, res) => {
  const nivelAcademicoId = req.params.id;
  const nivelAcademicoActualizado = new NivelAcademico(req.body);
  actualizarNivelAcademico(nivelAcademicoId, nivelAcademicoActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar un nivel académico:', err);
      res.status(500).json({ message: 'Error al actualizar un nivel académico' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Nivel académico no encontrado' });
    } else {
      res.status(200).json({ message: 'Nivel académico actualizado correctamente' });
    }
  });
};

const eliminarNivelAcademicoPorId = (req, res) => {
  const nivelAcademicoId = req.params.id;
  eliminarNivelAcademico(nivelAcademicoId, (err, result) => {
    if (err) {
      console.error('Error al eliminar un nivel académico:', err);
      res.status(500).json({ message: 'Error al eliminar un nivel académico' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Nivel académico no encontrado' });
    } else {
      res.status(200).json({ message: 'Nivel académico eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoNivelAcademico,
  obtenerTodosLosNivelesAcademicos,
  obtenerNivelAcademicoPorId,
  actualizarNivelAcademicoPorId,
  eliminarNivelAcademicoPorId
};
