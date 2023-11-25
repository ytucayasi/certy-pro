const Periodo = require('../models/Periodo');
const {
  crearPeriodo,
  obtenerTodos,
  obtenerPeriodo,
  actualizarPeriodo,
  eliminarPeriodo
} = require('../repositories/periodoRepository');

const crearNuevoPeriodo = (req, res) => {
  const nuevoPeriodo = new Periodo(req.body);
  crearPeriodo(nuevoPeriodo, (err, result) => {
    if (err) {
      console.error('Error al crear un periodo:', err);
      res.status(500).json({ message: 'Error al crear un periodo' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosPeriodos = (req, res) => {
  obtenerTodos((err, results) => {
    if (err) {
      console.error('Error al obtener periodos:', err);
      res.status(500).json({ message: 'Error al obtener periodos' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerPeriodoPorId = (req, res) => {
  const periodoId = req.params.id;
  obtenerPeriodo(periodoId, (err, result) => {
    if (err) {
      console.error('Error al obtener un periodo:', err);
      res.status(500).json({ message: 'Error al obtener un periodo' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Periodo no encontrado' });
    } else {
      const periodoConId = { id: periodoId, ...result };
      res.status(200).json(periodoConId);
    }
  });
};

const actualizarPeriodoPorId = (req, res) => {
  const periodoId = req.params.id;
  const periodoActualizado = new Periodo(req.body);
  actualizarPeriodo(periodoId, periodoActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar un periodo:', err);
      res.status(500).json({ message: 'Error al actualizar un periodo' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Periodo no encontrado' });
    } else {
      res.status(200).json({ message: 'Periodo actualizado correctamente' });
    }
  });
};

const eliminarPeriodoPorId = (req, res) => {
  const periodoId = req.params.id;
  eliminarPeriodo(periodoId, (err, result) => {
    if (err) {
      console.error('Error al eliminar un periodo:', err);
      res.status(500).json({ message: 'Error al eliminar un periodo' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Periodo no encontrado' });
    } else {
      res.status(200).json({ message: 'Periodo eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoPeriodo,
  obtenerTodosLosPeriodos,
  obtenerPeriodoPorId,
  actualizarPeriodoPorId,
  eliminarPeriodoPorId
};
