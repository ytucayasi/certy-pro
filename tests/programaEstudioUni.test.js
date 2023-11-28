const ProgramaEstudio = require('../src/models/ProgramaEstudio');
const {
  crearProgramaEstudio,
  obtenerTodosProgramasEstudio,
  obtenerProgramaEstudio,
  actualizarProgramaEstudio,
  eliminarProgramaEstudio
} = require('../src/repositories/programaEstudioRepository');

jest.mock('../src/repositories/programaEstudioRepository');

describe('ProgramaEstudio Model', () => {
  let programaEstudioInstance;

  beforeEach(() => {
    programaEstudioInstance = new ProgramaEstudio({
      id: 1,
      nombre: 'Programa de Estudio 1'
    });
  });

  test('Se crea correctamente una instancia de ProgramaEstudio', () => {
    expect(programaEstudioInstance).toBeInstanceOf(ProgramaEstudio);
  });

  test('Propiedades del modelo ProgramaEstudio', () => {
    expect(programaEstudioInstance.id).toBe(1);
    expect(programaEstudioInstance.nombre).toBe('Programa de Estudio 1');
  });
});



describe('ProgramaEstudio Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoProgramaEstudio() debe crear un nuevo programa de estudio correctamente', () => {
    const mockReq = {
      body: {
        nombre: 'Programa de Estudio 1'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const programaEstudioMock = {
      id: 1,
      ...mockReq.body
    };

    crearProgramaEstudio.mockImplementationOnce((programaEstudio, callback) => {
      callback(null, programaEstudioMock);
    });

    const controller = require('../src/controllers/programaEstudioController');

    controller.crearNuevoProgramaEstudio(mockReq, mockRes);

    expect(crearProgramaEstudio).toHaveBeenCalledWith(
      expect.any(ProgramaEstudio),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(programaEstudioMock);
  });

  test('obtenerTodosLosProgramaesEstudio() debe devolver todos los programaes de estudio correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      { id: 1, nombre: 'Programa de Estudio 1' },
      { id: 2, nombre: 'Programa de Estudio 2' }
    ];

    obtenerTodosProgramasEstudio.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    const controller = require('../src/controllers/programaEstudioController');

    controller.obtenerTodosLosProgramasEstudio(mockReq, mockRes);

    expect(obtenerTodosProgramasEstudio).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerProgramaEstudioPorId() debe devolver un programa de estudio específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      nombre: 'Programa de Estudio 1'
    };

    obtenerProgramaEstudio.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/programaEstudioController');

    controller.obtenerProgramaEstudioPorId(mockReq, mockRes);

    expect(obtenerProgramaEstudio).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarProgramaEstudioPorId() debe actualizar un programa de estudio correctamente', () => {
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

    actualizarProgramaEstudio.mockImplementationOnce((id, programaEstudio, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/programaEstudioController');

    controller.actualizarProgramaEstudioPorId(mockReq, mockRes);

    expect(actualizarProgramaEstudio).toHaveBeenCalledWith(
      1,
      expect.any(ProgramaEstudio),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'programa de estudio actualizado correctamente' });
  });

  test('eliminarProgramaEstudioPorId() debe eliminar un programa de estudio correctamente', () => {
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

    eliminarProgramaEstudio.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    const controller = require('../src/controllers/programaEstudioController');

    controller.eliminarProgramaEstudioPorId(mockReq, mockRes);

    expect(eliminarProgramaEstudio).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'programa de estudio eliminado correctamente' });
  });
});