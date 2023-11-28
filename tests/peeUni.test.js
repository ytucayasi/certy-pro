const PEE = require('../src/models/Pee');
const peeController = require('../src/controllers/peeController');
const peeRepository = require('../src/repositories/peeRepository');

jest.mock('../src/repositories/peeRepository');

describe('PEE Model', () => {
  test('Se crea correctamente una instancia de PEE', () => {
    const id = 1;
    const estudiante_id = 2;
    const plan_estudio_id = 3;

    const peeInstance = new PEE(id, estudiante_id, plan_estudio_id);

    expect(peeInstance).toBeInstanceOf(PEE);
    expect(peeInstance.id).toBe(id);
    expect(peeInstance.estudiante_id).toBe(estudiante_id);
    expect(peeInstance.plan_estudio_id).toBe(plan_estudio_id);
  });
});





describe('PEE Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoPEE() debe crear un nuevo PEE correctamente', () => {
    const mockReq = {
      body: {
        estudiante_id: 1,
        plan_estudio_id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const peeMock = {
      id: 1,
      estudiante_id: 1,
      plan_estudio_id: 1
    };

    peeRepository.crearPEE.mockImplementationOnce((pee, callback) => {
      callback(null, peeMock);
    });

    peeController.crearNuevoPEE(mockReq, mockRes);

    expect(peeRepository.crearPEE).toHaveBeenCalledWith(
      expect.any(PEE),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(peeMock);
  });

  test('obtenerTodosLosPEE() debe devolver todos los PEEs correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        estudiante_id: 1,
        plan_estudio_id: 1
      },
      {
        id: 2,
        estudiante_id: 2,
        plan_estudio_id: 2
      }
    ];

    peeRepository.obtenerTodosPEE.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    peeController.obtenerTodosLosPEE(mockReq, mockRes);

    expect(peeRepository.obtenerTodosPEE).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerPEEPorId() debe devolver un PEE específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      estudiante_id: 1,
      plan_estudio_id: 1
    };

    peeRepository.obtenerPEE.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    peeController.obtenerPEEPorId(mockReq, mockRes);

    expect(peeRepository.obtenerPEE).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarPEEPorId() debe actualizar un PEE correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        estudiante_id: 2,
        plan_estudio_id: 2
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    peeRepository.actualizarPEE.mockImplementationOnce((pee, callback) => {
      callback(null, mockResult);
    });

    peeController.actualizarPEEPorId(mockReq, mockRes);

    expect(peeRepository.actualizarPEE).toHaveBeenCalledWith(
      expect.any(PEE),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'PEE actualizado correctamente' });
  });

  test('eliminarPEEPorId() debe eliminar un PEE correctamente', () => {
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

    peeRepository.eliminarPEE.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    peeController.eliminarPEEPorId(mockReq, mockRes);

    expect(peeRepository.eliminarPEE).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'PEE eliminado correctamente' });
  });
});
