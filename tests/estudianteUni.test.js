const Estudiante = require('../src/models/Estudiante');
const estudianteController = require('../src/controllers/estudianteController');
const estudianteRepository = require('../src/repositories/estudianteRepository');
const {
  crearEstudiante,
  obtenerTodosEstudiantes,
  obtenerEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  obtenerEstudianteUsuario,
  obtenerEstudianteUsuarioPorCod,
  crearUsuarioYEstudiante,
  actualizarUsuarioYEstudiante,
  eliminarEstudianteYUsuario
} = require('../src/repositories/estudianteRepository');

jest.mock('../src/repositories/estudianteRepository');

describe('Estudiante Model', () => {
  test('Inicialización del modelo Estudiante', () => {
    const estudiante = new Estudiante({
      id: 1,
      nombres: 'Juan',
      apellidos: 'Pérez',
      foto: 'ruta/foto.png',
      dni: '12345678',
      codigo_universitario: 'ABC123',
      fecha_nacimiento: '1990-01-01',
      usuario_id: 101
    });

    expect(estudiante.id).toBe(1);
    expect(estudiante.nombres).toBe('Juan');
    expect(estudiante.apellidos).toBe('Pérez');
    expect(estudiante.foto).toBe('ruta/foto.png');
    expect(estudiante.dni).toBe('12345678');
    expect(estudiante.codigo_universitario).toBe('ABC123');
    expect(estudiante.fecha_nacimiento).toBe('1990-01-01');
    expect(estudiante.usuario_id).toBe(101);
  });
});


describe('Estudiante Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoEstudiante() debe crear un nuevo estudiante correctamente', () => {
    const mockReq = {
      body: {
        nombres: 'Nombre',
        apellidos: 'Apellido',
        foto: 'imagen.jpg',
        dni: '12345678',
        codigo_universitario: 'ABC123',
        fecha_nacimiento: '1990-01-01',
        usuario_id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const estudianteMock = {
      id: 1,
      ...mockReq.body
    };

    crearEstudiante.mockImplementationOnce((estudiante, callback) => {
      callback(null, estudianteMock);
    });

    const controller = require('../src/controllers/estudianteController');

    controller.crearNuevoEstudiante(mockReq, mockRes);

    expect(crearEstudiante).toHaveBeenCalledWith(
      expect.any(Estudiante),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(estudianteMock);
  });

  test('obtenerTodosLosEstudiantes() debe devolver todos los estudiantes correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        nombres: 'Nombre 1',
        apellidos: 'Apellido 1',
        foto: 'imagen.jpg',
        dni: '12345678',
        codigo_universitario: 'ABC123',
        fecha_nacimiento: '1990-01-01',
        usuario_id: 1
      },
      {
        id: 2,
        nombres: 'Nombre 2',
        apellidos: 'Apellido 2',
        foto: 'imagen2.jpg',
        dni: '12345638',
        codigo_universitario: 'ABC125',
        fecha_nacimiento: '1990-01-01',
        usuario_id: 2
      }
    ];

    obtenerTodosEstudiantes.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    const controller = require('../src/controllers/estudianteController');

    controller.obtenerTodosLosEstudiantes(mockReq, mockRes);

    expect(obtenerTodosEstudiantes).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });
});

