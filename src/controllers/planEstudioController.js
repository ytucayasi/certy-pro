const PlanEstudio = require('../models/PlanEstudio');
const {
  crearPlanEstudio,
  obtenerTodosPlanesEstudio,
  obtenerPlanEstudio,
  actualizarPlanEstudio,
  eliminarPlanEstudio
} = require('../repositories/planEstudioRepository');

const crearNuevoPlanEstudio = (req, res) => {
  const { nombre } = req.body;
  const nuevoPlanEstudio = new PlanEstudio({ id: null, nombre });
  
  crearPlanEstudio(nuevoPlanEstudio, (err, result) => {
    if (err) {
      console.error('Error al crear plan de estudio:', err);
      res.status(500).json({ message: 'Error al crear plan de estudio' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosPlanesEstudio = (req, res) => {
  obtenerTodosPlanesEstudio((err, results) => {
    if (err) {
      console.error('Error al obtener planes de estudio:', err);
      res.status(500).json({ message: 'Error al obtener planes de estudio' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerPlanEstudioPorId = (req, res) => {
  const planEstudioId = req.params.id;
  obtenerPlanEstudio(planEstudioId, (err, result) => {
    if (err) {
      console.error('Error al obtener plan de estudio:', err);
      res.status(500).json({ message: 'Error al obtener plan de estudio' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Plan de estudio no encontrado' });
    } else {
      const planEstudioConId = { id: planEstudioId, ...result };
      res.status(200).json(planEstudioConId);
    }
  });
};

const actualizarPlanEstudioPorId = (req, res) => {
  const planEstudioId = req.params.id;
  const planEstudioActualizado = new PlanEstudio(req.body);
  
  actualizarPlanEstudio(planEstudioId, planEstudioActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar plan de estudio:', err);
      res.status(500).json({ message: 'Error al actualizar plan de estudio' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Plan de estudio no encontrado' });
    } else {
      res.status(200).json({ message: 'Plan de estudio actualizado correctamente' });
    }
  });
};

const eliminarPlanEstudioPorId = (req, res) => {
  const planEstudioId = req.params.id;
  eliminarPlanEstudio(planEstudioId, (err, result) => {
    if (err) {
      console.error('Error al eliminar plan de estudio:', err);
      res.status(500).json({ message: 'Error al eliminar plan de estudio' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Plan de estudio no encontrado' });
    } else {
      res.status(200).json({ message: 'Plan de estudio eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoPlanEstudio,
  obtenerTodosLosPlanesEstudio,
  obtenerPlanEstudioPorId,
  actualizarPlanEstudioPorId,
  eliminarPlanEstudioPorId
};
