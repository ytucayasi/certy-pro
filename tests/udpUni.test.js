const UDP = require('../src/models/Udp');
const udpController = require('../src/controllers/udpController');
const udpRepository = require('../src/repositories/udpRepository');

jest.mock('../src/repositories/udpRepository');

describe('UDP Model', () => {
  test('Se crea correctamente una instancia de UDP', () => {
    const id = 1;
    const unidad_didactica_id = 2;
    const periodo_id = 3;

    const udpInstance = new UDP(id, unidad_didactica_id, periodo_id);

    expect(udpInstance).toBeInstanceOf(UDP);
    expect(udpInstance.id).toBe(id);
    expect(udpInstance.unidad_didactica_id).toBe(unidad_didactica_id);
    expect(udpInstance.periodo_id).toBe(periodo_id);
  });
});





describe('UDP Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('crearNuevoUDP() debe crear un nuevo UDP correctamente', () => {
    const mockReq = {
      body: {
        unidad_didactica_id: 1,
        periodo_id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const udpMock = {
      id: 1,
      unidad_didactica_id: 1,
      periodo_id: 1
    };

    udpRepository.crearUDP.mockImplementationOnce((udp, callback) => {
      callback(null, udpMock);
    });

    udpController.crearNuevoUDP(mockReq, mockRes);

    expect(udpRepository.crearUDP).toHaveBeenCalledWith(
      expect.any(UDP),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(udpMock);
  });

  test('obtenerTodosLosUDP() debe devolver todos los UDPs correctamente', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResults = [
      {
        id: 1,
        unidad_didactica_id: 1,
        periodo_id: 1
      },
      {
        id: 2,
        unidad_didactica_id: 2,
        periodo_id: 2
      }
    ];

    udpRepository.obtenerTodosUDP.mockImplementationOnce((callback) => {
      callback(null, mockResults);
    });

    udpController.obtenerTodosLosUDP(mockReq, mockRes);

    expect(udpRepository.obtenerTodosUDP).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });

  test('obtenerUDPPorId() debe devolver un UDP específico correctamente', () => {
    const mockReq = {
      params: { id: 1 }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      id: 1,
      unidad_didactica_id: 1,
      periodo_id: 1
    };

    udpRepository.obtenerUDP.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    udpController.obtenerUDPPorId(mockReq, mockRes);

    expect(udpRepository.obtenerUDP).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, ...mockResult });
  });

  test('actualizarUDPPorId() debe actualizar un UDP correctamente', () => {
    const mockReq = {
      params: { id: 1 },
      body: {
        unidad_didactica_id: 2,
        periodo_id: 2
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockResult = {
      affectedRows: 1
    };

    udpRepository.actualizarUDP.mockImplementationOnce((udp, callback) => {
      callback(null, mockResult);
    });

    udpController.actualizarUDPPorId(mockReq, mockRes);

    expect(udpRepository.actualizarUDP).toHaveBeenCalledWith(
      expect.any(UDP),
      expect.any(Function)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'UDP actualizado correctamente' });
  });

  test('eliminarUDPPorId() debe eliminar un UDP correctamente', () => {
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

    udpRepository.eliminarUDP.mockImplementationOnce((id, callback) => {
      callback(null, mockResult);
    });

    udpController.eliminarUDPPorId(mockReq, mockRes);

    expect(udpRepository.eliminarUDP).toHaveBeenCalledWith(1, expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'UDP eliminado correctamente' });
  });
});
