const Privilegio = require('../src/models/Privilegio');
const controller = require('../src/controllers/privilegioController');
const {
  crearPrivilegio,
  obtenerTodosPrivilegios,
  obtenerPrivilegio,
  actualizarPrivilegio,
  eliminarPrivilegio
} = require('../src/repositories/privilegioRepository');

jest.mock('../src/repositories/privilegioRepository');

describe('Privilegio Model', () => {
  let privilegioInstance;

  beforeEach(() => {
    privilegioInstance = new Privilegio({
      id: 1,
      nombre: 'Nombre de Privilegio',
      estado: '1'
    });
  });

  test('Se crea correctamente una instancia de Privilegio', () => {
    expect(privilegioInstance).toBeInstanceOf(Privilegio);
  });

  test('Propiedades del modelo Privilegio', () => {
    expect(privilegioInstance.id).toBe(1);
    expect(privilegioInstance.nombre).toBe('Nombre de Privilegio');
    expect(privilegioInstance.estado).toBe('1');
  });
});


describe('Privilegio Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoPrivilegio() debe crear un nuevo privilegio correctamente', () => {
    const mockReq = {
      body: {
        nombre: 'Nombre de Privilegio',
        estado: '1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const privilegioMock = {
      id: 1,
      ...mockReq.body
    };
  
    crearPrivilegio.mockImplementationOnce((privilegio, callback) => {
      callback(null, privilegioMock);
    });
    controller.crearNuevoPrivilegio(mockReq, mockRes);

    expect(crearPrivilegio).toHaveBeenCalledWith(
      expect.any(Privilegio),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(privilegioMock);
  });

  test('obtenerTodosLosPrivilegios() debe devolver todos los privilegios correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        nombre: 'Nombre de Privilegio 1',
        estado: '1'
      },
      {
        id: 2,
        nombre: 'Nombre de Privilegio 2',
        estado: 'in1'
      }
    ];

    obtenerTodosPrivilegios.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    controller.obtenerTodosLosPrivilegios(mockReq, mockRes);

    expect(obtenerTodosPrivilegios).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerPrivilegioPorId() debe devolver un privilegio específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      nombre: 'Nombre de Privilegio 1',
      estado: '1'
    };

    obtenerPrivilegio.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    controller.obtenerPrivilegioPorId(mockReq, mockRes);

    expect(obtenerPrivilegio).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarPrivilegioPorId() debe actualizar un privilegio correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        nombre: 'Nuevo Nombre de Privilegio',
        estado: 'in1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    actualizarPrivilegio.mockImplementationOnce((id, privilegio, callback) => {
      callback(null, mockResult);
    });

    controller.actualizarPrivilegioPorId(mockReq, mockRes);

    expect(actualizarPrivilegio).toHaveBeenCalledWith(
      1,
      expect.any(Privilegio),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Privilegio actualizado correctamente' });
  });

  test('eliminarPrivilegioPorId() debe eliminar un privilegio correctamente', () => {
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

    eliminarPrivilegio.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    controller.eliminarPrivilegioPorId(mockReq, mockRes);

    expect(eliminarPrivilegio).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Privilegio eliminado correctamente' });
  });
});