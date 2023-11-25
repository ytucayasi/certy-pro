const UnidadDidactica = require('../models/UnidadDidactica');
const {
  crearUnidadDidactica,
  obtenerTodosUnidadesDidactica,
  obtenerUnidadDidactica,
  actualizarUnidadDidactica,
  eliminarUnidadDidactica
} = require('../repositories/unidadDidacticaRepository');

const crearNuevoUnidadDidactica = (req, res) => {
  const { nombre } = req.body;
  const nuevoUnidadDidactica = new UnidadDidactica({ id: null, nombre });
  
  crearUnidadDidactica(nuevoUnidadDidactica, (err, result) => {
    if (err) {
      console.error('Error al crear unidad didactica:', err);
      res.status(500).json({ message: 'Error al crear unidad didactica' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosUnidadesDidactica = (req, res) => {
  obtenerTodosUnidadesDidactica((err, results) => {
    if (err) {
      console.error('Error al obtener unidades didacticas:', err);
      res.status(500).json({ message: 'Error al obtener unidades didacticas' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerUnidadDidacticaPorId = (req, res) => {
  const unidadDidacticaId = req.params.id;
  obtenerUnidadDidactica(unidadDidacticaId, (err, result) => {
    if (err) {
      console.error('Error al obtener unidad didactica:', err);
      res.status(500).json({ message: 'Error al obtener unidad didactica' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'unidad didactica no encontrado' });
    } else {
      const unidadDidacticaConId = { id: unidadDidacticaId, ...result };
      res.status(200).json(unidadDidacticaConId);
    }
  });
};

const actualizarUnidadDidacticaPorId = (req, res) => {
  const unidadDidacticaId = req.params.id;
  const unidadDidacticaActualizado = new UnidadDidactica(req.body);
  
  actualizarUnidadDidactica(unidadDidacticaId, unidadDidacticaActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar unidad didactica:', err);
      res.status(500).json({ message: 'Error al actualizar unidad didactica' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'unidad didactica no encontrado' });
    } else {
      res.status(200).json({ message: 'unidad didactica actualizado correctamente' });
    }
  });
};

const eliminarUnidadDidacticaPorId = (req, res) => {
  const unidadDidacticaId = req.params.id;
  eliminarUnidadDidactica(unidadDidacticaId, (err, result) => {
    if (err) {
      console.error('Error al eliminar unidad didactica:', err);
      res.status(500).json({ message: 'Error al eliminar unidad didactica' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'unidad didactica no encontrado' });
    } else {
      res.status(200).json({ message: 'unidad didactica eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoUnidadDidactica,
  obtenerTodosLosUnidadesDidactica,
  obtenerUnidadDidacticaPorId,
  actualizarUnidadDidacticaPorId,
  eliminarUnidadDidacticaPorId
};
