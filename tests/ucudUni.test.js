const UCUD = require('../src/models/Ucud');
const ucudController = require('../src/controllers/ucudController');
const ucudRepository = require('../src/repositories/ucudRepository');

jest.mock('../src/repositories/ucudRepository');

describe('UCUD Model', () => {
  test('Se crea correctamente una instancia de UCUD', () => {
    const id = 1;
    const unidad_competencia_id = 2;
    const unidad_didactica_id = 3;

    const ucudInstance = new UCUD(id, unidad_competencia_id, unidad_didactica_id);

    expect(ucudInstance).toBeInstanceOf(UCUD);
    expect(ucudInstance.id).toBe(id);
    expect(ucudInstance.unidad_competencia_id).toBe(unidad_competencia_id);
    expect(ucudInstance.unidad_didactica_id).toBe(unidad_didactica_id);
  });
});





describe('UCUD Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoUCUD() debe crear un nuevo UCUD correctamente', () => {
    const mockReq = {
      body: {
        unidad_competencia_id: 1,
        unidad_didactica_id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const ucudMock = {
      id: 1,
      unidad_competencia_id: 1,
      unidad_didactica_id: 1
    };

    ucudRepository.crearUCUD.mockImplementationOnce((ucud, callback) => {
      callback(null, ucudMock);
    });

    ucudController.crearNuevoUCUD(mockReq, mockRes);

    expect(ucudRepository.crearUCUD).toHaveBeenCalledWith(
      expect.any(UCUD),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(ucudMock);
  });

  test('obtenerTodosLosUCUD() debe devolver todos los UCUDs correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        unidad_competencia_id: 1,
        unidad_didactica_id: 1
      },
      {
        id: 2,
        unidad_competencia_id: 2,
        unidad_didactica_id: 2
      }
    ];

    ucudRepository.obtenerTodosUCUD.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    ucudController.obtenerTodosLosUCUD(mockReq, mockRes);

    expect(ucudRepository.obtenerTodosUCUD).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerUCUDPorId() debe devolver un UCUD específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      unidad_competencia_id: 1,
      unidad_didactica_id: 1
    };

    ucudRepository.obtenerUCUD.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    ucudController.obtenerUCUDPorId(mockReq, mockRes);

    expect(ucudRepository.obtenerUCUD).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarUCUDPorId() debe actualizar un UCUD correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        unidad_competencia_id: 2,
        unidad_didactica_id: 2
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    ucudRepository.actualizarUCUD.mockImplementationOnce((ucud, callback) => {
      callback(null, mockResult);
    });

    ucudController.actualizarUCUDPorId(mockReq, mockRes);

    expect(ucudRepository.actualizarUCUD).toHaveBeenCalledWith(
      expect.any(UCUD),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'UCUD actualizado correctamente' });
  });

  test('eliminarUCUDPorId() debe eliminar un UCUD correctamente', () => {
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

    ucudRepository.eliminarUCUD.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    ucudController.eliminarUCUDPorId(mockReq, mockRes);

    expect(ucudRepository.eliminarUCUD).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'UCUD eliminado correctamente' });
  });
});
