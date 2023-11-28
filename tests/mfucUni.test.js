const MFUC = require('../src/models/Mfuc');
const mfucController = require('../src/controllers/mfucController');
const mfucRepository = require('../src/repositories/mfucRepository');

jest.mock('../src/repositories/mfucRepository');

describe('MFUC Model', () => {
  test('Se crea correctamente una instancia de MFUC', () => {
    const id = 1;
    const modulo_formativo_id = 2;
    const unidad_competencia_id = 3;

    const mfucInstance = new MFUC(id, modulo_formativo_id, unidad_competencia_id);

    expect(mfucInstance).toBeInstanceOf(MFUC);
    expect(mfucInstance.id).toBe(id);
    expect(mfucInstance.modulo_formativo_id).toBe(modulo_formativo_id);
    expect(mfucInstance.unidad_competencia_id).toBe(unidad_competencia_id);
  });
});





describe('MFUC Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoMFUC() debe crear un nuevo MFUC correctamente', () => {
    const mockReq = {
      body: {
        modulo_formativo_id: 1,
        unidad_competencia_id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mfucMock = {
      id: 1,
      modulo_formativo_id: 1,
      unidad_competencia_id: 1
    };

    mfucRepository.crearMFUC.mockImplementationOnce((mfuc, callback) => {
      callback(null, mfucMock);
    });

    mfucController.crearNuevoMFUC(mockReq, mockRes);

    expect(mfucRepository.crearMFUC).toHaveBeenCalledWith(
      expect.any(MFUC),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mfucMock);
  });

  test('obtenerTodosLosMFUC() debe devolver todos los MFUCs correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        modulo_formativo_id: 1,
        unidad_competencia_id: 1
      },
      {
        id: 2,
        modulo_formativo_id: 2,
        unidad_competencia_id: 2
      }
    ];

    mfucRepository.obtenerTodosMFUC.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    mfucController.obtenerTodosLosMFUC(mockReq, mockRes);

    expect(mfucRepository.obtenerTodosMFUC).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerMFUCPorId() debe devolver un MFUC específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      modulo_formativo_id: 1,
      unidad_competencia_id: 1
    };

    mfucRepository.obtenerMFUC.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    mfucController.obtenerMFUCPorId(mockReq, mockRes);

    expect(mfucRepository.obtenerMFUC).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarMFUCPorId() debe actualizar un MFUC correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        modulo_formativo_id: 2,
        unidad_competencia_id: 2
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    mfucRepository.actualizarMFUC.mockImplementationOnce((mfuc, callback) => {
      callback(null, mockResult);
    });

    mfucController.actualizarMFUCPorId(mockReq, mockRes);

    expect(mfucRepository.actualizarMFUC).toHaveBeenCalledWith(
      expect.any(MFUC),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'MFUC actualizado correctamente' });
  });

  test('eliminarMFUCPorId() debe eliminar un MFUC correctamente', () => {
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

    mfucRepository.eliminarMFUC.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    mfucController.eliminarMFUCPorId(mockReq, mockRes);

    expect(mfucRepository.eliminarMFUC).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'MFUC eliminado correctamente' });
  });
});
