const DocumentoCopia = require('../models/DocumentoCopia');
const {
  crearDocumentoCopia,
  obtenerTodosDocumentosCopia,
  obtenerDocumentoCopia,
  actualizarDocumentoCopia,
  eliminarDocumentoCopia
} = require('../repositories/documentoCopiaRepository');

const crearNuevoDocumentoCopia = (req, res) => {
  const { url_doc, estado, tipo, documento_id } = req.body;
  const nuevoDocumentoCopia = new DocumentoCopia({ id: null, url_doc, estado, tipo, documento_id });
  
  crearDocumentoCopia(nuevoDocumentoCopia, (err, result) => {
    if (err) {
      console.error('Error al crear documento copia:', err);
      res.status(500).json({ message: 'Error al crear documento copia' });
      return;
    }
    res.status(201).json(result);
  });
};

const obtenerTodosLosDocumentosCopia = (req, res) => {
  obtenerTodosDocumentosCopia((err, results) => {
    if (err) {
      console.error('Error al obtener documentos copia:', err);
      res.status(500).json({ message: 'Error al obtener documentos copia' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerDocumentoCopiaPorId = (req, res) => {
  const documentoCopiaId = req.params.id;
  obtenerDocumentoCopia(documentoCopiaId, (err, result) => {
    if (err) {
      console.error('Error al obtener documento copia:', err);
      res.status(500).json({ message: 'Error al obtener documento copia' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Documento copia no encontrado' });
    } else {
      const documentoCopiaConId = { id: documentoCopiaId, ...result };
      res.status(200).json(documentoCopiaConId);
    }
  });
};

const actualizarDocumentoCopiaPorId = (req, res) => {
  const documentoCopiaId = req.params.id;
  const documentoCopiaActualizado = new DocumentoCopia(req.body);
  
  actualizarDocumentoCopia(documentoCopiaId, documentoCopiaActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar documento copia:', err);
      res.status(500).json({ message: 'Error al actualizar documento copia' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Documento copia no encontrado' });
    } else {
      res.status(200).json({ message: 'Documento copia actualizado correctamente' });
    }
  });
};

const eliminarDocumentoCopiaPorId = (req, res) => {
  const documentoCopiaId = req.params.id;
  eliminarDocumentoCopia(documentoCopiaId, (err, result) => {
    if (err) {
      console.error('Error al eliminar documento copia:', err);
      res.status(500).json({ message: 'Error al eliminar documento copia' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Documento copia no encontrado' });
    } else {
      res.status(200).json({ message: 'Documento copia eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoDocumentoCopia,
  obtenerTodosLosDocumentosCopia,
  obtenerDocumentoCopiaPorId,
  actualizarDocumentoCopiaPorId,
  eliminarDocumentoCopiaPorId
};
