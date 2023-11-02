const Documento = require('../models/Documento');
const {
  crearDocumento,
  obtenerTodos,
  obtenerDocumento,
  actualizarDocumento,
  eliminarDocumento
} = require('../repositories/documentoRepository');

const crearNuevoDocumento = (req, res) => {
  const nuevoDocumento = new Documento(req.body);
  crearDocumento(nuevoDocumento, (err, result) => {
    if (err) {
      console.error('Error al crear un documento:', err);
      res.status(500).json({ message: 'Error al crear un documento' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosDocumentos = (req, res) => {
  obtenerTodos((err, results) => {
    if (err) {
      console.error('Error al obtener elementos:', err);
      res.status(500).json({ message: 'Error al obtener elementos' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerDocumentoPorId = (req, res) => {
  const documentoId = req.params.id;
  obtenerDocumento(documentoId, (err, result) => {
    if (err) {
      console.error('Error al obtener un documento:', err);
      res.status(500).json({ message: 'Error al obtener un documento' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Documento no encontrado' });
    } else {
      const documentoConId = { id: documentoId, ...result };
      res.status(200).json(documentoConId);
    }
  });
};

const actualizarDocumentoPorId = (req, res) => {
  const documentoId = req.params.id;
  const documentoActualizado = new Documento(req.body);
  actualizarDocumento(documentoId, documentoActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar un documento:', err);
      res.status(500).json({ message: 'Error al actualizar un documento' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Documento no encontrado' });
    } else {
      res.status(200).json({ message: 'Documento actualizado correctamente' });
    }
  });
};

const eliminarDocumentoPorId = (req, res) => {
  const documentoId = req.params.id;
  eliminarDocumento(documentoId, (err, result) => {
    if (err) {
      console.error('Error al eliminar un documento:', err);
      res.status(500).json({ message: 'Error al eliminar un documento' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Documento no encontrado' });
    } else {
      res.status(200).json({ message: 'Documento eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoDocumento,
  obtenerTodosLosDocumentos,
  obtenerDocumentoPorId,
  actualizarDocumentoPorId,
  eliminarDocumentoPorId
};