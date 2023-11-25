const request = require('supertest');
const app = require('../src/app');

let periodoId;

describe('POST /api/periodos', () => {
  it('Debería crear un nuevo periodo', async () => {
    const response = await request(app)
      .post('/api/periodos')
      .send({ nombre: 'Periodo de prueba', horas: 50, creditos: 5 });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    periodoId = response.body.insertId;
  });
});

describe('GET /api/periodos', () => {
  it('Debería obtener una lista de periodos', async () => {
    const response = await request(app).get('/api/periodos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/periodos/:id', () => {
  it('Debería obtener un periodo por ID', async () => {
    const response = await request(app).get(`/api/periodos/${periodoId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(periodoId);
  });

  it('Debería manejar el caso en que el periodo no existe', async () => {
    const periodoIdNotExist = 999;
    const response = await request(app).get(`/api/periodos/${periodoIdNotExist}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/periodos/:id', () => {
  it('Debería actualizar un periodo por ID', async () => {
    const updatedPeriodoData = { nombre: 'Periodo Actualizado', horas: 60, creditos: 6 };
    const response = await request(app)
      .put(`/api/periodos/${periodoId}`)
      .send(updatedPeriodoData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el periodo no existe', async () => {
    const periodoIdNotExist = 999;
    const updatedPeriodoData = { nombre: 'Periodo Actualizado' };
    const response = await request(app)
      .put(`/api/periodos/${periodoIdNotExist}`)
      .send(updatedPeriodoData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/periodos/:id', () => {
  it('Debería eliminar un periodo por ID', async () => {
    const response = await request(app).delete(`/api/periodos/${periodoId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el periodo no existe', async () => {
    const periodoIdNotExist = 999;
    const response = await request(app).delete(`/api/periodos/${periodoIdNotExist}`);
    expect(response.status).toBe(404);
  });
});