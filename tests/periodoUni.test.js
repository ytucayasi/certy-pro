const Periodo = require('../src/models/Periodo');
const {
  crearPeriodo,
  obtenerTodos,
  obtenerPeriodo,
  actualizarPeriodo,
  eliminarPeriodo
} = require('../src/repositories/periodoRepository');

jest.mock('../src/repositories/periodoRepository');

describe('Periodo Model', () => {
  test('Se crea correctamente una instancia de Periodo', () => {
    const periodoInstance = new Periodo({
      id: 1,
      nombre: 'Periodo 1',
      horas: 100,
      creditos: 5
    });
    expect(periodoInstance).toBeInstanceOf(Periodo);
  });

  test('Propiedades del modelo Periodo', () => {
    const periodoInstance = new Periodo({
      id: 1,
      nombre: 'Periodo 1',
      horas: 100,
      creditos: 5
    });

    expect(periodoInstance.id).toBe(1);
    expect(periodoInstance.nombre).toBe('Periodo 1');
    expect(periodoInstance.horas).toBe(100);
    expect(periodoInstance.creditos).toBe(5);
  });

  test('Verificar si se asignan correctamente las propiedades por defecto', () => {
    const periodoInstance = new Periodo({
      id: 2,
      nombre: 'Periodo 2'
    });

    expect(periodoInstance.id).toBe(2);
    expect(periodoInstance.nombre).toBe('Periodo 2');
    expect(periodoInstance.horas).toBeUndefined();
    expect(periodoInstance.creditos).toBeUndefined();
  });
});



describe('Periodo Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoPeriodo() debe crear un nuevo periodo correctamente', () => {
    const mockReq = {
      body: {
        nombre: 'Periodo 1',
        horas: 100,
        creditos: 5
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const periodoMock = {
      id: 1,
      ...mockReq.body
    };

    crearPeriodo.mockImplementationOnce((periodo, callback) => {
      callback(null, periodoMock);
    });

    const controller = require('../src/controllers/periodoController');

    controller.crearNuevoPeriodo(mockReq, mockRes);

    expect(crearPeriodo).toHaveBeenCalledWith(
      expect.any(Periodo),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(periodoMock);
  });

  test('obtenerTodosLosPeriodos() debe devolver todos los periodos correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        nombre: 'Periodo 1',
        horas: 100,
        creditos: 5
      },
      {
        id: 2,
        nombre: 'Periodo 2',
        horas: 120,
        creditos: 6
      }
    ];

    obtenerTodos.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    const controller = require('../src/controllers/periodoController');

    controller.obtenerTodosLosPeriodos(mockReq, mockRes);

    expect(obtenerTodos).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerPeriodoPorId() debe devolver un periodo específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      nombre: 'Periodo 1',
      horas: 100,
      creditos: 5
    };

    obtenerPeriodo.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/periodoController');

    controller.obtenerPeriodoPorId(mockReq, mockRes);

    expect(obtenerPeriodo).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarPeriodoPorId() debe actualizar un periodo correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        nombre: 'Periodo Actualizado',
        horas: 150,
        creditos: 7
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    actualizarPeriodo.mockImplementationOnce((id, periodo, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/periodoController');

    controller.actualizarPeriodoPorId(mockReq, mockRes);

    expect(actualizarPeriodo).toHaveBeenCalledWith(
      1,
      expect.any(Periodo),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Periodo actualizado correctamente' });
  });

  test('eliminarPeriodoPorId() debe eliminar un periodo correctamente', () => {
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

    eliminarPeriodo.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/periodoController');

    controller.eliminarPeriodoPorId(mockReq, mockRes);

    expect(eliminarPeriodo).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Periodo eliminado correctamente' });
  });
});