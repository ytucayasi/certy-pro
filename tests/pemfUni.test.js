const PEMF = require('../src/models/Pemf');
const pemfController = require('../src/controllers/pemfController');
const pemfRepository = require('../src/repositories/pemfRepository');

jest.mock('../src/repositories/pemfRepository');

describe('PEMF Model', () => {
  test('Se crea correctamente una instancia de PEMF', () => {
    const id = 1;
    const programa_estudio_id = 2;
    const modulo_formativo_id = 3;

    const pemfInstance = new PEMF(id, programa_estudio_id, modulo_formativo_id);

    expect(pemfInstance).toBeInstanceOf(PEMF);
    expect(pemfInstance.id).toBe(id);
    expect(pemfInstance.programa_estudio_id).toBe(programa_estudio_id);
    expect(pemfInstance.modulo_formativo_id).toBe(modulo_formativo_id);
  });
});





describe('PEMF Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoPEMF() debe crear un nuevo PEMF correctamente', () => {
    const mockReq = {
      body: {
        programa_estudio_id: 1,
        modulo_formativo_id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const pemfMock = {
      id: 1,
      programa_estudio_id: 1,
      modulo_formativo_id: 1
    };

    pemfRepository.crearPEMF.mockImplementationOnce((pemf, callback) => {
      callback(null, pemfMock);
    });

    pemfController.crearNuevoPEMF(mockReq, mockRes);

    expect(pemfRepository.crearPEMF).toHaveBeenCalledWith(
      expect.any(PEMF),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(pemfMock);
  });

  test('obtenerTodosLosPEMF() debe devolver todos los PEMFs correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        programa_estudio_id: 1,
        modulo_formativo_id: 1
      },
      {
        id: 2,
        programa_estudio_id: 2,
        modulo_formativo_id: 2
      }
    ];

    pemfRepository.obtenerTodosPEMF.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    pemfController.obtenerTodosLosPEMF(mockReq, mockRes);

    expect(pemfRepository.obtenerTodosPEMF).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerPEMFPorId() debe devolver un PEMF específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      programa_estudio_id: 1,
      modulo_formativo_id: 1
    };

    pemfRepository.obtenerPEMF.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    pemfController.obtenerPEMFPorId(mockReq, mockRes);

    expect(pemfRepository.obtenerPEMF).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarPEMFPorId() debe actualizar un PEMF correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        programa_estudio_id: 2,
        modulo_formativo_id: 2
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    pemfRepository.actualizarPEMF.mockImplementationOnce((pemf, callback) => {
      callback(null, mockResult);
    });

    pemfController.actualizarPEMFPorId(mockReq, mockRes);

    expect(pemfRepository.actualizarPEMF).toHaveBeenCalledWith(
      expect.any(PEMF),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'PEMF actualizado correctamente' });
  });

  test('eliminarPEMFPorId() debe eliminar un PEMF correctamente', () => {
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

    pemfRepository.eliminarPEMF.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    pemfController.eliminarPEMFPorId(mockReq, mockRes);

    expect(pemfRepository.eliminarPEMF).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'PEMF eliminado correctamente' });
  });
});
