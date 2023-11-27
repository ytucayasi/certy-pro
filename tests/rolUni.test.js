const Rol = require('../src/models/Rol');
const rolController = require('../src/controllers/rolController');
const rolRepository = require('../src/repositories/rolRepository');

jest.mock('../src/repositories/rolRepository');

describe('Rol Model', () => {
  test('Se crea correctamente una instancia de Rol', () => {
    const rolInstance = new Rol({
      id: 1,
      nombre: 'Nombre del Rol',
      estado: '1'
    });
    expect(rolInstance).toBeInstanceOf(Rol);
  });

  test('Propiedades del modelo Rol', () => {
    const rolInstance = new Rol({
      id: 1,
      nombre: 'Nombre del Rol',
      estado: '1'
    });
    expect(rolInstance.id).toBe(1);
    expect(rolInstance.nombre).toBe('Nombre del Rol');
    expect(rolInstance.estado).toBe('1');
  });
});




describe('Rol Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoRol() debe crear un nuevo rol correctamente', () => {
    const mockReq = {
      body: {
        nombre: 'Nombre del Rol',
        estado: '1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const rolMock = {
      id: 1,
      ...mockReq.body
    };

    rolRepository.crearRol.mockImplementationOnce((rol, callback) => {
      callback(null, rolMock);
    });

    rolController.crearNuevoRol(mockReq, mockRes);

    expect(rolRepository.crearRol).toHaveBeenCalledWith(
      expect.any(Rol),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(rolMock);
  });

  test('obtenerTodosLosRoles() debe devolver todos los roles correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        nombre: 'Nombre del Rol 1',
        estado: '1'
      },
      {
        id: 2,
        nombre: 'Nombre del Rol 2',
        estado: '0'
      }
    ];

    rolRepository.obtenerTodosRoles.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    rolController.obtenerTodosLosRoles(mockReq, mockRes);

    expect(rolRepository.obtenerTodosRoles).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerRolPorId() debe devolver un rol específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      nombre: 'Nombre del Rol 1',
      estado: '1'
    };

    rolRepository.obtenerRol.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    rolController.obtenerRolPorId(mockReq, mockRes);

    expect(rolRepository.obtenerRol).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarRolPorId() debe actualizar un rol correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        nombre: 'Nuevo Nombre del Rol',
        estado: '1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    rolRepository.actualizarRol.mockImplementationOnce((id, rol, callback) => {
      callback(null, mockResult);
    });

    rolController.actualizarRolPorId(mockReq, mockRes);

    expect(rolRepository.actualizarRol).toHaveBeenCalledWith(
      1,
      expect.any(Rol),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Rol actualizado correctamente' });
  });

  test('eliminarRolPorId() debe eliminar un rol correctamente', () => {
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

    rolRepository.eliminarRol.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    rolController.eliminarRolPorId(mockReq, mockRes);

    expect(rolRepository.eliminarRol).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Rol eliminado correctamente' });
  });
});
