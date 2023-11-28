const Ins = require('../src/models/Ins');
const controller = require('../src/controllers/insController');
const {
  crearIns,
  obtenerTodosIns,
  obtenerIns,
  actualizarIns,
  eliminarIns
} = require('../src/repositories/insRepository');

jest.mock('../src/repositories/insRepository');

describe('Ins Model', () => {
  let insInstance;

  beforeEach(() => {
    insInstance = new Ins({
      id: 1,
      nombre: 'Nombre de Ins',
      codigo: 'INS123',
      url_logo: 'https://example.com/logo.png',
      responsable: 'Responsable Ins',
      sector: '0'
    });
  });

  test('Se crea correctamente una instancia de Ins', () => {
    expect(insInstance).toBeInstanceOf(Ins);
  });

  test('Propiedades del modelo Ins', () => {
    expect(insInstance.id).toBe(1);
    expect(insInstance.nombre).toBe('Nombre de Ins');
    expect(insInstance.codigo).toBe('INS123');
    expect(insInstance.url_logo).toBe('https://example.com/logo.png');
    expect(insInstance.responsable).toBe('Responsable Ins');
    expect(insInstance.sector).toBe('0');
  });

  test('obtenerInformacionDetallada() devuelve la información correcta', () => {
    const infoDetallada = insInstance.obtenerInformacionDetallada();
    expect(infoDetallada).toEqual({
      id: 1,
      nombre: 'Nombre de Ins',
      codigo: 'INS123',
      url_logo: 'https://example.com/logo.png',
      responsable: 'Responsable Ins',
      sector: '0'
    });
  });
});


describe('Ins Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevaIns() debe crear una nueva entidad Ins correctamente', () => {
    const mockReq = {
      body: {
        nombre: 'Nombre de Ins',
        codigo: 'INS123',
        url_logo: 'https://example.com/logo.png',
        responsable: 'Responsable Ins',
        sector: '0'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const insMock = {
      id: 1,
      ...mockReq.body
    };
  
    crearIns.mockImplementationOnce((ins, callback) => {
      callback(null, insMock);
    });
    controller.crearNuevaIns(mockReq, mockRes);

    expect(crearIns).toHaveBeenCalledWith(
      expect.any(Ins),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(insMock);
  });

  test('obtenerTodasIns() debe devolver todas las entidades Ins correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        nombre: 'Nombre de Ins 1',
        codigo: 'INS001',
        url_logo: 'https://example.com/logo1.png',
        responsable: 'Responsable Ins 1',
        sector: '1'
      },
      {
        id: 2,
        nombre: 'Nombre de Ins 2',
        codigo: 'INS002',
        url_logo: 'https://example.com/logo2.png',
        responsable: 'Responsable Ins 2',
        sector: '2'
      }
    ];

    obtenerTodosIns.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    controller.obtenerTodasIns(mockReq, mockRes);

    expect(obtenerTodosIns).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerInsPorId() debe devolver una entidad Ins específica correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      nombre: 'Nombre de Ins 1',
      codigo: 'INS001',
      url_logo: 'https://example.com/logo1.png',
      responsable: 'Responsable Ins 1',
      sector: '1'
    };

    obtenerIns.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    controller.obtenerInsPorId(mockReq, mockRes);

    expect(obtenerIns).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarInsPorId() debe actualizar una entidad Ins correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        nombre: 'Nuevo Nombre de Ins',
        codigo: 'INS456',
        url_logo: 'https://example.com/logo_nuevo.png',
        responsable: 'Nuevo Responsable Ins',
        sector: '1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    actualizarIns.mockImplementationOnce((id, ins, callback) => {
      callback(null, mockResult);
    });

    controller.actualizarInsPorId(mockReq, mockRes);

    expect(actualizarIns).toHaveBeenCalledWith(
      1,
      expect.any(Ins),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Ins actualizada correctamente' });
  });

  test('eliminarInsPorId() debe eliminar una entidad Ins correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    eliminarIns.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    controller.eliminarInsPorId(mockReq, mockRes);

    expect(eliminarIns).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Ins eliminada correctamente' });
  });
});

