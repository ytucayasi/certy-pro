const Usuario = require('../src/models/Usuario');
const controller = require('../src/controllers/usuarioController');
const {
  crearUsuario,
  obtenerTodos,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require('../src/repositories/usuarioRepository');

jest.mock('../src/repositories/usuarioRepository');

describe('Usuario Model', () => {
  let usuarioInstance;

  beforeEach(() => {
    usuarioInstance = new Usuario({
      id: 1,
      nombre: 'Nombre de Usuario',
      correo: 'usuario@example.com',
      clave: 'password123',
      estado: '1'
    });
  });

  test('Se crea correctamente una instancia de Usuario', () => {
    expect(usuarioInstance).toBeInstanceOf(Usuario);
  });

  test('Propiedades del modelo Usuario', () => {
    expect(usuarioInstance.id).toBe(1);
    expect(usuarioInstance.nombre).toBe('Nombre de Usuario');
    expect(usuarioInstance.correo).toBe('usuario@example.com');
    expect(usuarioInstance.clave).toBe('password123');
    expect(usuarioInstance.estado).toBe('1');
  });
});

describe('Usuario Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoUsuario() debe crear un nuevo usuario correctamente', () => {
    const mockReq = {
      body: {
        nombre: 'Nombre de Usuario',
        correo: 'usuario@example.com',
        clave: 'password123',
        estado: '1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const usuarioMock = {
      id: 1,
      ...mockReq.body
    };

    crearUsuario.mockImplementationOnce((usuario, callback) => {
      callback(null, usuarioMock);
    });

    controller.crearNuevoUsuario(mockReq, mockRes);

    expect(crearUsuario).toHaveBeenCalledWith(
      expect.any(Usuario),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(usuarioMock);
  });

  test('obtenerTodosLosUsuarios() debe devolver todos los usuarios correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        nombre: 'Nombre de Usuario 1',
        correo: 'usuario1@example.com',
        clave: 'password123',
        estado: '1'
      },
      {
        id: 2,
        nombre: 'Nombre de Usuario 2',
        correo: 'usuario2@example.com',
        clave: 'password456',
        estado: 'in1'
      }
    ];

    obtenerTodos.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    controller.obtenerTodosLosUsuarios(mockReq, mockRes);

    expect(obtenerTodos).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerUsuarioPorId() debe devolver un usuario específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      nombre: 'Nombre de Usuario 1',
      correo: 'usuario1@example.com',
      clave: 'password123',
      estado: '1'
    };

    obtenerUsuario.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    controller.obtenerUsuarioPorId(mockReq, mockRes);

    expect(obtenerUsuario).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarUsuarioPorId() debe actualizar un usuario correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        nombre: 'Nuevo Nombre de Usuario',
        correo: 'nuevo_usuario@example.com',
        clave: 'nueva_clave',
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

    actualizarUsuario.mockImplementationOnce((id, usuario, callback) => {
      callback(null, mockResult);
    });

    controller.actualizarUsuarioPorId(mockReq, mockRes);

    expect(actualizarUsuario).toHaveBeenCalledWith(
      1,
      expect.any(Usuario),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Usuario actualizado correctamente' });
  });

  test('eliminarUsuarioPorId() debe eliminar un usuario correctamente', () => {
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

    eliminarUsuario.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    controller.eliminarUsuarioPorId(mockReq, mockRes);

    expect(eliminarUsuario).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Usuario eliminado correctamente' });
  });
});
