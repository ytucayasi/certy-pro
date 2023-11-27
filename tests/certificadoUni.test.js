const Certificado = require('../src/models/Certificado');
const certificadoRepository = require('../src/repositories/certificadoRepository');
const certificadoController = require('../src/controllers/certificadoController');
const {
  crearCertificado,
  obtenerTodosCertificados,
} = require('../src/repositories/certificadoRepository');

jest.mock('../src/repositories/certificadoRepository');
  
  describe('Certificado Model', () => {
    test('Inicialización del modelo Certificado', () => {
      const certificado = new Certificado({
        id: 1,
        nombre_certificado: 'Certificado de Prueba',
        tipo: '1',
        estado: '1',
        codigo: 'ABC123',
        creditos: 110,
        horas: 1600,
        lugar: 'Universidad XYZ',
        fecha_creacion: '2023-11-30',
        nivel_academico_id: 1,
        documento_id: 1,
        estudiante_id: 2,
      });
  
      expect(certificado.id).toBe(1);
      expect(certificado.nombre_certificado).toBe('Certificado de Prueba');
      expect(certificado.tipo).toBe('1');
      expect(certificado.estado).toBe('1');
      expect(certificado.codigo).toBe('ABC123');
      expect(certificado.creditos).toBe(110);
      expect(certificado.horas).toBe(1600);
      expect(certificado.lugar).toBe('Universidad XYZ');
      expect(certificado.fecha_creacion).toBe('2023-11-30');
      expect(certificado.nivel_academico_id).toBe(1);
      expect(certificado.documento_id).toBe(1);
      expect(certificado.estudiante_id).toBe(2);
    });
  });
  
  
  describe('Certificado Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('crearNuevoCertificado() debe crear un nuevo certificado correctamente', () => {
      const mockReq = {
        body: {
          nombre_certificado: 'Certificado de Prueba',
          tipo: '1',
          estado: '1',
          codigo: 'ABC123',
          creditos: 110,
          horas: 1600,
          lugar: 'Universidad XYZ',
          fecha_creacion: '2023-11-30',
          nivel_academico_id: 1,
          documento_id: 1,
          estudiante_id: 2,
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const certificadoMock = {
        id: 1,
        ...mockReq.body
      };
  
      crearCertificado.mockImplementationOnce((certificado, callback) => {
        callback(null, certificadoMock);
      });
  
      const controller = require('../src/controllers/certificadoController');
  
      controller.crearNuevoCertificado(mockReq, mockRes);
  
      expect(crearCertificado).toHaveBeenCalledWith(
        expect.any(Certificado),
        expect.any(Function)
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(certificadoMock);
    });
});
