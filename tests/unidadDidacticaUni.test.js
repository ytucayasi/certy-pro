const UnidadDidactica = require('../src/models/UnidadDidactica');
const {
  crearUnidadDidactica,
  obtenerTodosUnidadesDidactica,
  obtenerUnidadDidactica,
  actualizarUnidadDidactica,
  eliminarUnidadDidactica
} = require('../src/repositories/unidadDidacticaRepository');

jest.mock('../src/repositories/unidadDidacticaRepository');

describe('UnidadDidactica Model', () => {
  let unidadDidacticaInstance;

  beforeEach(() => {
    unidadDidacticaInstance = new UnidadDidactica({
      id: 1,
      nombre: 'Unidad competencia 1'
    });
  });

  test('Se crea correctamente una instancia de UnidadDidactica', () => {
    expect(unidadDidacticaInstance).toBeInstanceOf(UnidadDidactica);
  });

  test('Propiedades del modelo UnidadDidactica', () => {
    expect(unidadDidacticaInstance.id).toBe(1);
    expect(unidadDidacticaInstance.nombre).toBe('Unidad competencia 1');
  });
});



describe('UnidadDidactica Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoUnidadDidactica() debe crear una nueva unidad competencia correctamente', () => {
    const mockReq = {
      body: {
        nombre: 'Unidad competencia 1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const unidadDidacticaMock = {
      id: 1,
      ...mockReq.body
    };

    crearUnidadDidactica.mockImplementationOnce((unidadDidactica, callback) => {
      callback(null, unidadDidacticaMock);
    });

    const controller = require('../src/controllers/unidadDidacticaController');

    controller.crearNuevoUnidadDidactica(mockReq, mockRes);

    expect(crearUnidadDidactica).toHaveBeenCalledWith(
      expect.any(UnidadDidactica),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(unidadDidacticaMock);
  });

  test('obtenerTodosLosProgramaesEstudio() debe devolver todas las unidades de competencia correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      { id: 1, nombre: 'Unidad competencia 1' },
      { id: 2, nombre: 'Unidad competencia 2' }
    ];

    obtenerTodosUnidadesDidactica.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    const controller = require('../src/controllers/unidadDidacticaController');

    controller.obtenerTodosLosUnidadesDidactica(mockReq, mockRes);

    expect(obtenerTodosUnidadesDidactica).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerUnidadDidacticaPorId() debe devolver una unidad competencia específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      nombre: 'Unidad competencia 1'
    };

    obtenerUnidadDidactica.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/unidadDidacticaController');

    controller.obtenerUnidadDidacticaPorId(mockReq, mockRes);

    expect(obtenerUnidadDidactica).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarUnidadDidacticaPorId() debe actualizar un unidad competencia correctamente', () => {
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

    actualizarUnidadDidactica.mockImplementationOnce((id, unidadDidactica, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/unidadDidacticaController');

    controller.actualizarUnidadDidacticaPorId(mockReq, mockRes);

    expect(actualizarUnidadDidactica).toHaveBeenCalledWith(
      1,
      expect.any(UnidadDidactica),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'unidad didactica actualizado correctamente' });
  });

  test('eliminarUnidadDidacticaPorId() debe eliminar un unidad competencia correctamente', () => {
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

    eliminarUnidadDidactica.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/unidadDidacticaController');

    controller.eliminarUnidadDidacticaPorId(mockReq, mockRes);

    expect(eliminarUnidadDidactica).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'unidad didactica eliminado correctamente' });
  });
});