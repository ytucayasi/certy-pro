const PlanEstudio = require('../src/models/PlanEstudio');
const {
  crearPlanEstudio,
  obtenerTodosPlanesEstudio,
  obtenerPlanEstudio,
  actualizarPlanEstudio,
  eliminarPlanEstudio
} = require('../src/repositories/planEstudioRepository');

jest.mock('../src/repositories/planEstudioRepository');

describe('PlanEstudio Model', () => {
  let planEstudioInstance;

  beforeEach(() => {
    planEstudioInstance = new PlanEstudio({
      id: 1,
      nombre: 'Plan de Estudio 1'
    });
  });

  test('Se crea correctamente una instancia de PlanEstudio', () => {
    expect(planEstudioInstance).toBeInstanceOf(PlanEstudio);
  });

  test('Propiedades del modelo PlanEstudio', () => {
    expect(planEstudioInstance.id).toBe(1);
    expect(planEstudioInstance.nombre).toBe('Plan de Estudio 1');
  });
});



describe('PlanEstudio Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoPlanEstudio() debe crear un nuevo plan de estudio correctamente', () => {
    const mockReq = {
      body: {
        nombre: 'Plan de Estudio 1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const planEstudioMock = {
      id: 1,
      ...mockReq.body
    };

    crearPlanEstudio.mockImplementationOnce((planEstudio, callback) => {
      callback(null, planEstudioMock);
    });

    const controller = require('../src/controllers/planEstudioController');

    controller.crearNuevoPlanEstudio(mockReq, mockRes);

    expect(crearPlanEstudio).toHaveBeenCalledWith(
      expect.any(PlanEstudio),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(planEstudioMock);
  });

  test('obtenerTodosLosPlanesEstudio() debe devolver todos los planes de estudio correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      { id: 1, nombre: 'Plan de Estudio 1' },
      { id: 2, nombre: 'Plan de Estudio 2' }
    ];

    obtenerTodosPlanesEstudio.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    const controller = require('../src/controllers/planEstudioController');

    controller.obtenerTodosLosPlanesEstudio(mockReq, mockRes);

    expect(obtenerTodosPlanesEstudio).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerPlanEstudioPorId() debe devolver un plan de estudio específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      nombre: 'Plan de Estudio 1'
    };

    obtenerPlanEstudio.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/planEstudioController');

    controller.obtenerPlanEstudioPorId(mockReq, mockRes);

    expect(obtenerPlanEstudio).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarPlanEstudioPorId() debe actualizar un plan de estudio correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        nombre: 'Plan de Estudio Actualizado'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    actualizarPlanEstudio.mockImplementationOnce((id, planEstudio, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/planEstudioController');

    controller.actualizarPlanEstudioPorId(mockReq, mockRes);

    expect(actualizarPlanEstudio).toHaveBeenCalledWith(
      1,
      expect.any(PlanEstudio),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Plan de estudio actualizado correctamente' });
  });

  test('eliminarPlanEstudioPorId() debe eliminar un plan de estudio correctamente', () => {
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

    eliminarPlanEstudio.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/planEstudioController');

    controller.eliminarPlanEstudioPorId(mockReq, mockRes);

    expect(eliminarPlanEstudio).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Plan de estudio eliminado correctamente' });
  });
});