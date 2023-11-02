const Certificado = require('../models/Certificado');
const {
  crearCertificado,
  obtenerTodosCertificados,
  obtenerCertificado,
  actualizarCertificado,
  eliminarCertificado
} = require('../repositories/certificadoRepository');

const crearNuevoCertificado = (req, res) => {
  const nuevoCertificado = new Certificado(req.body);
  crearCertificado(nuevoCertificado, (err, result) => {
    if (err) {
      console.error('Error al crear un certificado:', err);
      res.status(500).json({ message: 'Error al crear un certificado' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosCertificados = (req, res) => {
  obtenerTodosCertificados((err, results) => {
    if (err) {
      console.error('Error al obtener elementos:', err);
      res.status(500).json({ message: 'Error al obtener elementos' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerCertificadoPorId = (req, res) => {
  const certificadoId = req.params.id;
  obtenerCertificado(certificadoId, (err, result) => {
    if (err) {
      console.error('Error al obtener un certificado:', err);
      res.status(500).json({ message: 'Error al obtener un certificado' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Certificado no encontrado' });
    } else {
      const certificadoConId = { id: certificadoId, ...result };
      res.status(200).json(certificadoConId);
    }
  });
};

const actualizarCertificadoPorId = (req, res) => {
  const certificadoId = req.params.id;
  const certificadoActualizado = new Certificado(req.body);
  actualizarCertificado(certificadoId, certificadoActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar un certificado:', err);
      res.status(500).json({ message: 'Error al actualizar un certificado' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Certificado no encontrado' });
    } else {
      res.status(200).json({ message: 'Certificado actualizado correctamente' });
    }
  });
};

const eliminarCertificadoPorId = (req, res) => {
  const certificadoId = req.params.id;
  eliminarCertificado(certificadoId, (err, result) => {
    if (err) {
      console.error('Error al eliminar un certificado:', err);
      res.status(500).json({ message: 'Error al eliminar un certificado' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Certificado no encontrado' });
    } else {
      res.status(200).json({ message: 'Certificado eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoCertificado,
  obtenerTodosLosCertificados,
  obtenerCertificadoPorId,
  actualizarCertificadoPorId,
  eliminarCertificadoPorId
};
