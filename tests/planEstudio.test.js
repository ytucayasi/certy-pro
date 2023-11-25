const request = require('supertest');
const app = require('../src/app');

let planEstudioId;

describe('POST /api/planes_estudio', () => {
  it('Debería crear un nuevo plan de estudio', async () => {
    const response = await request(app)
      .post('/api/planes_estudio')
      .send({ nombre: 'Plan de Estudio 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    planEstudioId = response.body.insertId;
  });
});

describe('GET /api/planes_estudio', () => {
  it('Debería obtener una lista de planes de estudio', async () => {
    const response = await request(app).get('/api/planes_estudio');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/planes_estudio/:id', () => {
  it('Debería obtener un plan de estudio por ID', async () => {
    const response = await request(app).get(`/api/planes_estudio/${planEstudioId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(planEstudioId);
  });

  it('Debería manejar el caso en que el plan de estudio no existe', async () => {
    const nonExistingPlanEstudioId = 999;
    const response = await request(app).get(`/api/planes_estudio/${nonExistingPlanEstudioId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/planes_estudio/:id', () => {
  it('Debería actualizar un plan de estudio por ID', async () => {
    const updatedPlanEstudioData = {
      nombre: 'Plan de Estudio Actualizado'
    };
    const response = await request(app)
      .put(`/api/planes_estudio/${planEstudioId}`)
      .send(updatedPlanEstudioData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el plan de estudio no existe', async () => {
    const nonExistingPlanEstudioId = 999;
    const updatedPlanEstudioData = {
      nombre: 'Plan de Estudio Actualizado'
    };
    const response = await request(app)
      .put(`/api/planes_estudio/${nonExistingPlanEstudioId}`)
      .send(updatedPlanEstudioData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/planes_estudio/:id', () => {
  it('Debería eliminar un plan de estudio por ID', async () => {
    const response = await request(app).delete(`/api/planes_estudio/${planEstudioId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el plan de estudio no existe', async () => {
    const nonExistingPlanEstudioId = 999;
    const response = await request(app).delete(`/api/planes_estudio/${nonExistingPlanEstudioId}`);
    expect(response.status).toBe(404);
  });
});