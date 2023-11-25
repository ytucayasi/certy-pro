const request = require('supertest');
const app = require('../src/app');


let udpId;

describe('POST /api/udp', () => {
  let unidadDidacticaId = 0;
  let periodoId = 0;

  it('Debería crear una nueva unidad didactica', async () => {
    const response = await request(app)
      .post('/api/unidades_didactica')
      .send({ nombre: 'Unidad Didactica 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    unidadDidacticaId = response.body.insertId;
  });

  it('Debería crear un nuevo periodo', async () => {
    const response = await request(app)
      .post('/api/periodos')
      .send({ nombre: 'Periodo de prueba', horas: 50, creditos: 5 });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    periodoId = response.body.insertId;
  });

  it('Debería crear un nuevo udp', async () => {
    const response = await request(app)
      .post('/api/udp')
      .send({ unidad_didactica_id: unidadDidacticaId, periodo_id: periodoId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    udpId = response.body.insertId;
  });
});

describe('GET /api/udp', () => {
  it('Debería obtener una lista de udp', async () => {
    const response = await request(app).get('/api/udp');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/udp/:id', () => {
  it('Debería obtener un udp por ID', async () => {
    const response = await request(app).get(`/api/udp/${udpId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(udpId);
  });

  it('Debería manejar el caso en que el udp no existe', async () => {
    const udpId = 999;
    const response = await request(app).get(`/api/udp/${udpId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/udp/:id', () => {
  it('Debería actualizar un udp por ID', async () => {
    const updatedUdpData = {
      unidad_didactica_id: 1,
      periodo_id: 1,
    };
    const response = await request(app)
      .put(`/api/udp/${udpId}`)
      .send(updatedUdpData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el udp no existe', async () => {
    const nonExistingUdpId = 999;
    const updatedUdpData = {
      unidad_didactica_id: 1,
      periodo_id: 1,
    };
    const response = await request(app)
      .put(`/api/udp/${nonExistingUdpId}`)
      .send(updatedUdpData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/udp/:id', () => {
  it('Debería eliminar un udp por ID', async () => {
    const response = await request(app).delete(`/api/udp/${udpId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el udp no existe', async () => {
    const nonExistingUdpId = 999;
    const response = await request(app).delete(`/api/udp/${nonExistingUdpId}`);
    expect(response.status).toBe(404);
  });
});