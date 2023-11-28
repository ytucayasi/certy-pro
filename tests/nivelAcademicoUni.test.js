const NivelAcademico = require('../src/models/NivelAcademico');
const controller = require('../src/controllers/nivelAcademicoController');
const repository = require('../src/repositories/nivelAcademicoRepository');

jest.mock('../src/repositories/nivelAcademicoRepository');

describe('NivelAcademico model', () => {
  it('Crea una instancia de NivelAcademico con datos válidos', () => {
    const nivelAcademico = new NivelAcademico({
      id: 1,
      nivel: '1',
      tipo: '2',
    });

    expect(nivelAcademico).toBeInstanceOf(NivelAcademico);
    expect(nivelAcademico.id).toEqual(1);
    expect(nivelAcademico.nivel).toEqual('1');
    expect(nivelAcademico.tipo).toEqual('2');
  });
});



describe('NivelAcademico Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Debería crear un nuevo nivel académico', () => {
    const req = { body: { id: 1, nivel: '1', tipo: '2' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockResult = { id: 1, nivel: '1', tipo: '2' };
    repository.crearNivelAcademico.mockImplementationOnce((nivelAcademico, callback) => {
      callback(null, mockResult);
    });

    controller.crearNuevoNivelAcademico(req, res);

    expect(repository.crearNivelAcademico).toHaveBeenCalledWith(expect.any(Object), expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it('Debería obtener un nivel académico por ID', () => {
    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockResult = { id: 1, nivel: '1', tipo: '2' };
    repository.obtenerNivelAcademico.mockImplementationOnce((nivelAcademicoId, callback) => {
      callback(null, mockResult);
    });

    controller.obtenerNivelAcademicoPorId(req, res);

    expect(repository.obtenerNivelAcademico).toHaveBeenCalledWith(1, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, nivel: '1', tipo: '2' });
  });

  it('Debería actualizar un nivel académico por ID', () => {
    const req = { params: { id: 1 }, body: { id: 1, nivel: '2', tipo: '2' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockResult = { affectedRows: 1 };
    repository.actualizarNivelAcademico.mockImplementationOnce((nivelAcademicoId, nivelAcademicoActualizado, callback) => {
      callback(null, mockResult);
    });

    controller.actualizarNivelAcademicoPorId(req, res);

    expect(repository.actualizarNivelAcademico).toHaveBeenCalledWith(1, expect.any(Object), expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Nivel académico actualizado correctamente' });
  });

  it('Debería eliminar un nivel académico por ID', () => {
    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockResult = { affectedRows: 1 };
    repository.eliminarNivelAcademico.mockImplementationOnce((nivelAcademicoId, callback) => {
      callback(null, mockResult);
    });

    controller.eliminarNivelAcademicoPorId(req, res);

    expect(repository.eliminarNivelAcademico).toHaveBeenCalledWith(1, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Nivel académico eliminado correctamente' });
  });
})
