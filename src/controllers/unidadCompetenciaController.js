const UnidadCompetencia = require('../models/UnidadCompetencia');
const {
  crearUnidadCompetencia,
  obtenerTodosUnidadesCompetencia,
  obtenerUnidadCompetencia,
  actualizarUnidadCompetencia,
  eliminarUnidadCompetencia
} = require('../repositories/unidadCompetenciaRepository');

const crearNuevoUnidadCompetencia = (req, res) => {
  const { nombre } = req.body;
  const nuevoUnidadCompetencia = new UnidadCompetencia({ id: null, nombre });
  
  crearUnidadCompetencia(nuevoUnidadCompetencia, (err, result) => {
    if (err) {
      console.error('Error al crear unidad de competencia:', err);
      res.status(500).json({ message: 'Error al crear unidad de competencia' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosUnidadesCompetencia = (req, res) => {
  obtenerTodosUnidadesCompetencia((err, results) => {
    if (err) {
      console.error('Error al obtener unidades de competencia:', err);
      res.status(500).json({ message: 'Error al obtener unidades de competencia' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerUnidadCompetenciaPorId = (req, res) => {
  const unidadCompetenciaId = req.params.id;
  obtenerUnidadCompetencia(unidadCompetenciaId, (err, result) => {
    if (err) {
      console.error('Error al obtener unidad de competencia:', err);
      res.status(500).json({ message: 'Error al obtener unidad de competencia' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'unidad de competencia no encontrado' });
    } else {
      const unidadCompetenciaConId = { id: unidadCompetenciaId, ...result };
      res.status(200).json(unidadCompetenciaConId);
    }
  });
};

const actualizarUnidadCompetenciaPorId = (req, res) => {
  const unidadCompetenciaId = req.params.id;
  const unidadCompetenciaActualizado = new UnidadCompetencia(req.body);
  
  actualizarUnidadCompetencia(unidadCompetenciaId, unidadCompetenciaActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar unidad de competencia:', err);
      res.status(500).json({ message: 'Error al actualizar unidad de competencia' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'unidad de competencia no encontrado' });
    } else {
      res.status(200).json({ message: 'unidad de competencia actualizado correctamente' });
    }
  });
};

const eliminarUnidadCompetenciaPorId = (req, res) => {
  const unidadCompetenciaId = req.params.id;
  eliminarUnidadCompetencia(unidadCompetenciaId, (err, result) => {
    if (err) {
      console.error('Error al eliminar unidad de competencia:', err);
      res.status(500).json({ message: 'Error al eliminar unidad de competencia' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'unidad de competencia no encontrado' });
    } else {
      res.status(200).json({ message: 'unidad de competencia eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoUnidadCompetencia,
  obtenerTodosLosUnidadesCompetencia,
  obtenerUnidadCompetenciaPorId,
  actualizarUnidadCompetenciaPorId,
  eliminarUnidadCompetenciaPorId
};
