const UnidadCompetencia = require('../src/models/UnidadCompetencia');
const {
  crearUnidadCompetencia,
  obtenerTodosUnidadesCompetencia,
  obtenerUnidadCompetencia,
  actualizarUnidadCompetencia,
  eliminarUnidadCompetencia
} = require('../src/repositories/unidadCompetenciaRepository');

jest.mock('../src/repositories/unidadCompetenciaRepository');

describe('UnidadCompetencia Model', () => {
  let unidadCompetenciaInstance;

  beforeEach(() => {
    unidadCompetenciaInstance = new UnidadCompetencia({
      id: 1,
      nombre: 'Unidad competencia 1'
    });
  });

  test('Se crea correctamente una instancia de UnidadCompetencia', () => {
    expect(unidadCompetenciaInstance).toBeInstanceOf(UnidadCompetencia);
  });

  test('Propiedades del modelo UnidadCompetencia', () => {
    expect(unidadCompetenciaInstance.id).toBe(1);
    expect(unidadCompetenciaInstance.nombre).toBe('Unidad competencia 1');
  });
});



describe('UnidadCompetencia Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoUnidadCompetencia() debe crear una nueva unidad competencia correctamente', () => {
    const mockReq = {
      body: {
        nombre: 'Unidad competencia 1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const unidadCompetenciaMock = {
      id: 1,
      ...mockReq.body
    };

    crearUnidadCompetencia.mockImplementationOnce((unidadCompetencia, callback) => {
      callback(null, unidadCompetenciaMock);
    });

    const controller = require('../src/controllers/unidadCompetenciaController');

    controller.crearNuevoUnidadCompetencia(mockReq, mockRes);

    expect(crearUnidadCompetencia).toHaveBeenCalledWith(
      expect.any(UnidadCompetencia),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(unidadCompetenciaMock);
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

    obtenerTodosUnidadesCompetencia.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    const controller = require('../src/controllers/unidadCompetenciaController');

    controller.obtenerTodosLosUnidadesCompetencia(mockReq, mockRes);

    expect(obtenerTodosUnidadesCompetencia).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerUnidadCompetenciaPorId() debe devolver una unidad competencia específico correctamente', () => {
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

    obtenerUnidadCompetencia.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/unidadCompetenciaController');

    controller.obtenerUnidadCompetenciaPorId(mockReq, mockRes);

    expect(obtenerUnidadCompetencia).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarUnidadCompetenciaPorId() debe actualizar un unidad competencia correctamente', () => {
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

    actualizarUnidadCompetencia.mockImplementationOnce((id, unidadCompetencia, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/unidadCompetenciaController');

    controller.actualizarUnidadCompetenciaPorId(mockReq, mockRes);

    expect(actualizarUnidadCompetencia).toHaveBeenCalledWith(
      1,
      expect.any(UnidadCompetencia),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'unidad de competencia actualizado correctamente' });
  });

  test('eliminarUnidadCompetenciaPorId() debe eliminar un unidad competencia correctamente', () => {
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

    eliminarUnidadCompetencia.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/unidadCompetenciaController');

    controller.eliminarUnidadCompetenciaPorId(mockReq, mockRes);

    expect(eliminarUnidadCompetencia).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'unidad de competencia eliminado correctamente' });
  });
});