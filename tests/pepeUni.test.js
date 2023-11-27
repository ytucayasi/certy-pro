const PEPE = require('../src/models/Pepe');
const pepeController = require('../src/controllers/pepeController');
const pepeRepository = require('../src/repositories/pepeRepository');

jest.mock('../src/repositories/pepeRepository');

describe('PEPE Model', () => {
  test('Se crea correctamente una instancia de PEPE', () => {
    const id = 1;
    const plan_estudio_id = 2;
    const programa_estudio_id = 3;

    const pepeInstance = new PEPE(id, plan_estudio_id, programa_estudio_id);

    expect(pepeInstance).toBeInstanceOf(PEPE);
    expect(pepeInstance.id).toBe(id);
    expect(pepeInstance.plan_estudio_id).toBe(plan_estudio_id);
    expect(pepeInstance.programa_estudio_id).toBe(programa_estudio_id);
  });
});





describe('PEPE Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoPEPE() debe crear un nuevo PEPE correctamente', () => {
    const mockReq = {
      body: {
        plan_estudio_id: 1,
        programa_estudio_id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const pepeMock = {
      id: 1,
      plan_estudio_id: 1,
      programa_estudio_id: 1
    };

    pepeRepository.crearPEPE.mockImplementationOnce((pepe, callback) => {
      callback(null, pepeMock);
    });

    pepeController.crearNuevoPEPE(mockReq, mockRes);

    expect(pepeRepository.crearPEPE).toHaveBeenCalledWith(
      expect.any(PEPE),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(pepeMock);
  });

  test('obtenerTodosLosPEPE() debe devolver todos los PEPEs correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        plan_estudio_id: 1,
        programa_estudio_id: 1
      },
      {
        id: 2,
        plan_estudio_id: 2,
        programa_estudio_id: 2
      }
    ];

    pepeRepository.obtenerTodosPEPE.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    pepeController.obtenerTodosLosPEPE(mockReq, mockRes);

    expect(pepeRepository.obtenerTodosPEPE).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerPEPEPorId() debe devolver un PEPE específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      plan_estudio_id: 1,
      programa_estudio_id: 1
    };

    pepeRepository.obtenerPEPE.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    pepeController.obtenerPEPEPorId(mockReq, mockRes);

    expect(pepeRepository.obtenerPEPE).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarPEPEPorId() debe actualizar un PEPE correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        plan_estudio_id: 2,
        programa_estudio_id: 2
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    pepeRepository.actualizarPEPE.mockImplementationOnce((pepe, callback) => {
      callback(null, mockResult);
    });

    pepeController.actualizarPEPEPorId(mockReq, mockRes);

    expect(pepeRepository.actualizarPEPE).toHaveBeenCalledWith(
      expect.any(PEPE),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'PEPE actualizado correctamente' });
  });

  test('eliminarPEPEPorId() debe eliminar un PEPE correctamente', () => {
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

    pepeRepository.eliminarPEPE.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    pepeController.eliminarPEPEPorId(mockReq, mockRes);

    expect(pepeRepository.eliminarPEPE).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'PEPE eliminado correctamente' });
  });
});
