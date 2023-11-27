const PR = require('../src/models/Pr');
const prController = require('../src/controllers/prController');
const prRepository = require('../src/repositories/prRepository');

jest.mock('../src/repositories/prRepository');

describe('PR Model', () => {
  test('Se crea correctamente una instancia de PR', () => {
    const prInstance = new PR(1, 1, 1);
    expect(prInstance).toBeInstanceOf(PR);
  });

  test('Propiedades del modelo PR', () => {
    const prInstance = new PR(1, 1, 1);
    expect(prInstance.id).toBe(1);
    expect(prInstance.privilegio_id).toBe(1);
    expect(prInstance.privilegio_id).toBe(1);
  });
});




describe('PR Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoPR() debe crear un nuevo PR correctamente', () => {
    const mockReq = {
      body: {
        privilegio_id: 1,
        privilegio_id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const prMock = {
      id: 1,
      ...mockReq.body
    };

    prRepository.crearPR.mockImplementationOnce((pr, callback) => {
      callback(null, prMock);
    });

    prController.crearNuevoPR(mockReq, mockRes);

    expect(prRepository.crearPR).toHaveBeenCalledWith(
      expect.any(PR),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(prMock);
  });

  test('obtenerTodosLosPR() debe devolver todos los PR correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        privilegio_id: 1,
        privilegio_id: 1
      },
      {
        id: 2,
        privilegio_id: 2,
        privilegio_id: 2
      }
    ];

    prRepository.obtenerTodosPR.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    prController.obtenerTodosLosPR(mockReq, mockRes);

    expect(prRepository.obtenerTodosPR).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerPRPorId() debe devolver un PR específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      privilegio_id: 1,
      privilegio_id: 1
    };

    prRepository.obtenerPR.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    prController.obtenerPRPorId(mockReq, mockRes);

    expect(prRepository.obtenerPR).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });
  
  test('actualizarPRPorId() debe actualizar un PR correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        privilegio_id: 2,
        rol_id: 2
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    prRepository.actualizarPR.mockImplementationOnce((pr, callback) => {
      callback(null, mockResult);
    });

    prController.actualizarPRPorId(mockReq, mockRes);

    expect(prRepository.actualizarPR).toHaveBeenCalledWith(
      expect.any(PR),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'PR actualizado correctamente' });
  });

  test('eliminarPRPorId() debe eliminar un PR correctamente', () => {
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

    prRepository.eliminarPR.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    prController.eliminarPRPorId(mockReq, mockRes);

    expect(prRepository.eliminarPR).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'PR eliminado correctamente' });
  });
});

