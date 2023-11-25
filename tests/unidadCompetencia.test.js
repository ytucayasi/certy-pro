const request = require('supertest');
const app = require('../src/app');

let unidadCompetenciaId;

describe('POST /api/unidades_competencia', () => {
  it('Debería crear una nueva unidad de competencia', async () => {
    const response = await request(app)
      .post('/api/unidades_competencia')
      .send({ nombre: 'Unidad Competencia 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    unidadCompetenciaId = response.body.insertId;
  });
});

describe('GET /api/unidades_competencia', () => {
  it('Debería obtener una lista de unidades de competencia', async () => {
    const response = await request(app).get('/api/unidades_competencia');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/unidades_competencia/:id', () => {
  it('Debería obtener una unidad de competencia por ID', async () => {
    const response = await request(app).get(`/api/unidades_competencia/${unidadCompetenciaId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(unidadCompetenciaId);
  });

  it('Debería manejar el caso en que la unidad de competencia no existe', async () => {
    const nonExistingUnidadCompetenciaId = 999;
    const response = await request(app).get(`/api/unidades_competencia/${nonExistingUnidadCompetenciaId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/unidades_competencia/:id', () => {
  it('Debería actualizar una unidad de competencia por ID', async () => {
    const updatedUnidadCompetenciaData = {
      nombre: 'Unidad de competencia Actualizado'
    };
    const response = await request(app)
      .put(`/api/unidades_competencia/${unidadCompetenciaId}`)
      .send(updatedUnidadCompetenciaData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que la unidad de competencia no existe', async () => {
    const nonExistingUnidadCompetenciaId = 999;
    const updatedUnidadCompetenciaData = {
      nombre: 'Unidad de competencia Actualizado'
    };
    const response = await request(app)
      .put(`/api/unidades_competencia/${nonExistingUnidadCompetenciaId}`)
      .send(updatedUnidadCompetenciaData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/unidades_competencia/:id', () => {
  it('Debería eliminar una unidad de competencia por ID', async () => {
    const response = await request(app).delete(`/api/unidades_competencia/${unidadCompetenciaId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que la unidad de competencia no existe', async () => {
    const nonExistingUnidadCompetenciaId = 999;
    const response = await request(app).delete(`/api/unidades_competencia/${nonExistingUnidadCompetenciaId}`);
    expect(response.status).toBe(404);
  });
});