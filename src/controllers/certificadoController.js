const Certificado = require('../models/Certificado');
const {
  crearCertificado,
  obtenerCertificados,
  actualizarCertificado,
  eliminarCertificado,
  crearDocumentoYCertificado,
  actualizarDocumentoDesdeCertificado
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

const actualizarDocumentoDesdeCertificadoController = (req, res) => {
  const certificadoId = req.params.id; // Reemplaza con la forma en que obtienes el ID del certificado desde la solicitud
  const nuevoDocumento = req.body.documento; // Ajusta según la estructura de tu solicitud
  console.log(req.body);

  actualizarDocumentoDesdeCertificado(certificadoId, nuevoDocumento, (err, resultadoDocumento) => {
    if (err) {
      console.error('Error al actualizar el documento desde el certificado:', err);
      res.status(500).json({ message: 'Error al actualizar el documento desde el certificado' });
      return;
    }

    // Envía la respuesta con el resultado de la actualización del documento
    res.status(200).json({
      documento: resultadoDocumento
    });
  });
};


const crearNuevoCertificadoMejorado = (req, res) => {
  console.log(req.body);
  const { documentoInfo, certificadoInfo } = req.body;
  console.log(documentoInfo, certificadoInfo);
  // Crear un nuevo documento y certificado
  crearDocumentoYCertificado(documentoInfo, certificadoInfo, (err, result) => {
    if (err) {
      console.error('Error al crear un certificado y documento:', err);
      res.status(500).json({ message: 'Error al crear un certificado y documento' });
      return;
    }

    const { documento, certificado } = result;

    // Puedes personalizar la respuesta según tus necesidades
    res.status(201).json({
      message: 'Certificado y documento creados exitosamente',
      documento_id: documento.insertId,
      certificado_id: certificado.insertId
    });
  });
};

const obtenerCertificadosControl = (req, res) => {
  const certificadoId = req.params.id;
  obtenerCertificados(certificadoId, (err, results) => {
    if (err) {
      console.error('Error al obtener certificados:', err);
      res.status(500).json({ message: 'Error al obtener certificados' });
      return;
    }
    if (!results) {
      res.status(404).json({ message: 'Certificados no encontrados' });
    } else {
      // Formatear los resultados
      const certificados = results.map((certificado) => ({
        certificado: {
          id: certificado.certificado_id,
          nombre_certificado: certificado.nombre_certificado,
          tipo: certificado.certificado_tipo,
          estado: certificado.certificado_estado,
          codigo: certificado.codigo,
          creditos: certificado.creditos,
          horas: certificado.horas,
          lugar: certificado.lugar,
          fecha_creacion: certificado.fecha_creacion,
          // otros campos de certificado que puedas necesitar
        },
        estudiante: {
          id: certificado.estudiante_id,
          nombres: certificado.estudiante_nombres,
          apellidos: certificado.estudiante_apellidos,
          dni: certificado.estudiante_dni,
          codigo_universitario: certificado.codigo_universitario,
          usuario_id: certificado.estudiante_usuario_id,
        },
        documento: {
          id: certificado.documento_id,
          url_doc: certificado.url_doc,
          // otros campos de documento que puedas necesitar
        },
        nivel_academico: {
          id: certificado.nivel_academico_id,
          nivel: certificado.nivel,
          // otros campos de nivel_academico que puedas necesitar
        },
      }));

      res.status(200).json(certificados);
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
  obtenerCertificadosControl,
  actualizarCertificadoPorId,
  eliminarCertificadoPorId,
  crearNuevoCertificadoMejorado,
  actualizarDocumentoDesdeCertificadoController
};
