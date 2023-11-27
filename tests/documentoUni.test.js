const Documento = require('../src/models/Documento');
const documentoController = require('../src/controllers/documentoController');
const documentoRepository = require('../src/repositories/documentoRepository');

jest.mock('../src/repositories/documentoRepository');

describe('Documento Model', () => {
  it('debe devolver la URL completa del documento', () => {
    const documentoData = {
      id: 1,
      url_doc: 'ruta/al/documento.pdf',
      estado: '1'
    };
    const documento = new Documento(documentoData);
    const urlCompleta = documento.getURLCompleta();

    expect(urlCompleta).toBe('ruta/al/documento.pdf');
  });
});



describe('Documento Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe crear un nuevo documento', () => {
    const mockReq = {
      body: {
        url_doc: 'ruta/al/nuevo_documento.pdf',
        estado: '1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNuevoDocumento = new Documento(mockReq.body);

    documentoRepository.crearDocumento.mockImplementationOnce((documento, callback) => {
      callback(null, mockNuevoDocumento);
    });

    documentoController.crearNuevoDocumento(mockReq, mockRes);

    expect(documentoRepository.crearDocumento).toHaveBeenCalledWith(mockNuevoDocumento, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockNuevoDocumento);
  });

  it('debe obtener todos los documentos', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockDocumentos = [
      new Documento({ id: 1, url_doc: 'ruta/doc1.pdf', estado: '1' }),
      new Documento({ id: 2, url_doc: 'ruta/doc2.pdf', estado: '0' })
    ];

    documentoRepository.obtenerTodos.mockImplementationOnce(callback => {
      callback(null, mockDocumentos);
    });

    documentoController.obtenerTodosLosDocumentos(mockReq, mockRes);

    expect(documentoRepository.obtenerTodos).toHaveBeenCalledWith(expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockDocumentos);
  });

  it('debe obtener un documento por ID', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockDocumento = new Documento({ id: 1, url_doc: 'ruta/doc1.pdf', estado: '1' });

    documentoRepository.obtenerDocumento.mockImplementationOnce((id, callback) => {
      callback(null, mockDocumento);
    });

    documentoController.obtenerDocumentoPorId(mockReq, mockRes);

    expect(documentoRepository.obtenerDocumento).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockDocumento });
  });

  it('debe eliminar un documento por ID', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    documentoRepository.eliminarDocumento.mockImplementationOnce((id, callback) => {
      callback(null, { affectedRows: 1 });
    });

    documentoController.eliminarDocumentoPorId(mockReq, mockRes);

    expect(documentoRepository.eliminarDocumento).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Documento eliminado correctamente' });
  });
});
