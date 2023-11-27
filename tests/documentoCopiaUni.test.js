const DocumentoCopia = require('../src/models/DocumentoCopia');
const {
  crearDocumentoCopia,
} = require('../src/repositories/documentoCopiaRepository');

jest.mock('../src/repositories/documentoCopiaRepository');

describe('DocumentoCopia Model', () => {
  let documentoCopiaInstance;

  beforeEach(() => {
    documentoCopiaInstance = new DocumentoCopia({
      id: 1,
      url_doc: 'https://example.com/documento.pdf',
      estado: '1',
      tipo: '1',
      documento_id: 101
    });
  });

  test('Se crea correctamente una instancia de DocumentoCopia', () => {
    expect(documentoCopiaInstance).toBeInstanceOf(DocumentoCopia);
  });

  test('Propiedades del modelo DocumentoCopia', () => {
    expect(documentoCopiaInstance.id).toBe(1);
    expect(documentoCopiaInstance.url_doc).toBe('https://example.com/documento.pdf');
    expect(documentoCopiaInstance.estado).toBe('1');
    expect(documentoCopiaInstance.tipo).toBe('1');
    expect(documentoCopiaInstance.documento_id).toBe(101);
  });
});

describe('DocumentoCopia Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoDocumentoCopia() debe crear un nuevo documento copia correctamente', () => {
    const mockReq = {
      body: {
        url_doc: 'https://ejemplo.com/documento.pdf',
        estado: '1',
        tipo: '1',
        documento_id: 101
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const documentoCopiaMock = {
      id: 1,
      ...mockReq.body
    };

    crearDocumentoCopia.mockImplementationOnce((documentoCopia, callback) => {
      callback(null, documentoCopiaMock);
    });

    const controller = require('../src/controllers/documentoCopiaController');

    controller.crearNuevoDocumentoCopia(mockReq, mockRes);

    expect(crearDocumentoCopia).toHaveBeenCalledWith(
      expect.any(DocumentoCopia),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(documentoCopiaMock);
  });
});
