const ModuloFormativo = require('../src/models/ModuloFormativo');
const {
  crearModuloFormativo,
  obtenerTodosModulosFormativo,
  obtenerModuloFormativo,
  actualizarModuloFormativo,
  eliminarModuloFormativo
} = require('../src/repositories/moduloFormativoRepository');

jest.mock('../src/repositories/moduloFormativoRepository');

describe('ModuloFormativo Model', () => {
  let moduloFormativoInstance;

  beforeEach(() => {
    moduloFormativoInstance = new ModuloFormativo({
      id: 1,
      nombre: 'Modulo formativo 1'
    });
  });

  test('Se crea correctamente una instancia de ModuloFormativo', () => {
    expect(moduloFormativoInstance).toBeInstanceOf(ModuloFormativo);
  });

  test('Propiedades del modelo ModuloFormativo', () => {
    expect(moduloFormativoInstance.id).toBe(1);
    expect(moduloFormativoInstance.nombre).toBe('Modulo formativo 1');
  });
});



describe('ModuloFormativo Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoModuloFormativo() debe crear un nuevo modulo formativo correctamente', () => {
    const mockReq = {
      body: {
        nombre: 'Modulo formativo 1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const moduloFormativoMock = {
      id: 1,
      ...mockReq.body
    };

    crearModuloFormativo.mockImplementationOnce((moduloFormativo, callback) => {
      callback(null, moduloFormativoMock);
    });

    const controller = require('../src/controllers/moduloFormativoController');

    controller.crearNuevoModuloFormativo(mockReq, mockRes);

    expect(crearModuloFormativo).toHaveBeenCalledWith(
      expect.any(ModuloFormativo),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(moduloFormativoMock);
  });

  test('obtenerTodosLosProgramaesEstudio() debe devolver todos los programaes de estudio correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      { id: 1, nombre: 'Modulo formativo 1' },
      { id: 2, nombre: 'Modulo formativo 2' }
    ];

    obtenerTodosModulosFormativo.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    const controller = require('../src/controllers/moduloFormativoController');

    controller.obtenerTodosLosModulosFormativo(mockReq, mockRes);

    expect(obtenerTodosModulosFormativo).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerModuloFormativoPorId() debe devolver un modulo formativo específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      nombre: 'Modulo formativo 1'
    };

    obtenerModuloFormativo.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/moduloFormativoController');

    controller.obtenerModuloFormativoPorId(mockReq, mockRes);

    expect(obtenerModuloFormativo).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarModuloFormativoPorId() debe actualizar un modulo formativo correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        nombre: 'programa de Estudio Actualizado'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    actualizarModuloFormativo.mockImplementationOnce((id, moduloFormativo, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/moduloFormativoController');

    controller.actualizarModuloFormativoPorId(mockReq, mockRes);

    expect(actualizarModuloFormativo).toHaveBeenCalledWith(
      1,
      expect.any(ModuloFormativo),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Modulo formativo actualizado correctamente' });
  });

  test('eliminarModuloFormativoPorId() debe eliminar un modulo formativo correctamente', () => {
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

    eliminarModuloFormativo.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/moduloFormativoController');

    controller.eliminarModuloFormativoPorId(mockReq, mockRes);

    expect(eliminarModuloFormativo).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Modulo formativo eliminado correctamente' });
  });
});