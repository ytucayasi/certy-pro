const request = require('supertest');
const app = require('../src/app');

let nivelAcademicoId;

describe('POST /api/niveles-academicos', () => {
  it('Debería crear un nuevo nivel académico', async () => {
    const response = await request(app)
      .post('/api/niveles-academicos')
      .send({ nivel: '1', tipo: '0' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    nivelAcademicoId = response.body.insertId;
  });
});

describe('GET /api/niveles-academicos', () => {
  it('Debería obtener una lista de niveles académicos', async () => {
    const response = await request(app).get('/api/niveles-academicos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/niveles-academicos/:id', () => {
  it('Debería obtener un nivel académico por ID', async () => {
    const response = await request(app).get(`/api/niveles-academicos/${nivelAcademicoId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(nivelAcademicoId);
  });

  it('Debería manejar el caso en que el nivel académico no existe', async () => {
    const nivelAcademicoId = 999;
    const response = await request(app).get(`/api/niveles-academicos/${nivelAcademicoId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/niveles-academicos/:id', () => {
  it('Debería actualizar un nivel académico por ID', async () => {
    const updatedNivelAcademicoData = { nivel: '1', tipo: '1' };
    const response = await request(app)
      .put(`/api/niveles-academicos/${nivelAcademicoId}`)
      .send(updatedNivelAcademicoData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el nivel académico no existe', async () => {
    const nivelAcademicoId = 999;
    const updatedNivelAcademicoData = { nivel: '1' };
    const response = await request(app)
      .put(`/api/niveles-academicos/${nivelAcademicoId}`)
      .send(updatedNivelAcademicoData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/niveles-academicos/:id', () => {
  it('Debería eliminar un nivel académico por ID', async () => {
    const response = await request(app).delete(`/api/niveles-academicos/${nivelAcademicoId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el nivel académico no existe', async () => {
    const nivelAcademicoId = 999;
    const response = await request(app).delete(`/api/niveles-academicos/${nivelAcademicoId}`);
    expect(response.status).toBe(404);
  });
});
