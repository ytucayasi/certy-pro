const RU = require('../src/models/Ru');
const ruController = require('../src/controllers/ruController');
const ruRepository = require('../src/repositories/ruRepository');

jest.mock('../src/repositories/ruRepository');

describe('RU Model', () => {
  test('Se crea correctamente una instancia de RU', () => {
    const id = 1;
    const rol_id = 2;
    const usuario_id = 3;

    const ruInstance = new RU(id, rol_id, usuario_id);

    expect(ruInstance).toBeInstanceOf(RU);
    expect(ruInstance.id).toBe(id);
    expect(ruInstance.rol_id).toBe(rol_id);
    expect(ruInstance.usuario_id).toBe(usuario_id);
  });
});





describe('RU Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoRU() debe crear un nuevo RU correctamente', () => {
    const mockReq = {
      body: {
        rol_id: 1,
        usuario_id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const ruMock = {
      id: 1,
      rol_id: 1,
      usuario_id: 1
    };

    ruRepository.crearRU.mockImplementationOnce((ru, callback) => {
      callback(null, ruMock);
    });

    ruController.crearNuevoRU(mockReq, mockRes);

    expect(ruRepository.crearRU).toHaveBeenCalledWith(
      expect.any(RU),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(ruMock);
  });

  test('obtenerTodosLosRU() debe devolver todos los RUs correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        rol_id: 1,
        usuario_id: 1
      },
      {
        id: 2,
        rol_id: 2,
        usuario_id: 2
      }
    ];

    ruRepository.obtenerTodosRU.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    ruController.obtenerTodosLosRU(mockReq, mockRes);

    expect(ruRepository.obtenerTodosRU).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerRUPorId() debe devolver un RU específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      rol_id: 1,
      usuario_id: 1
    };

    ruRepository.obtenerRU.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    ruController.obtenerRUPorId(mockReq, mockRes);

    expect(ruRepository.obtenerRU).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarRUPorId() debe actualizar un RU correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        rol_id: 2,
        usuario_id: 2
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    ruRepository.actualizarRU.mockImplementationOnce((ru, callback) => {
      callback(null, mockResult);
    });

    ruController.actualizarRUPorId(mockReq, mockRes);

    expect(ruRepository.actualizarRU).toHaveBeenCalledWith(
      expect.any(RU),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'RU actualizado correctamente' });
  });

  test('eliminarRUPorId() debe eliminar un RU correctamente', () => {
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

    ruRepository.eliminarRU.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    ruController.eliminarRUPorId(mockReq, mockRes);

    expect(ruRepository.eliminarRU).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'RU eliminado correctamente' });
  });
});
