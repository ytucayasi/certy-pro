const request = require('supertest');
const app = require('../src/app');

let programaEstudioId;

describe('POST /api/programas_estudio', () => {
  it('Debería crear un nuevo programa de estudio', async () => {
    const response = await request(app)
      .post('/api/programas_estudio')
      .send({ nombre: 'programa de Estudio 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    programaEstudioId = response.body.insertId;
  });
});

describe('GET /api/programas_estudio', () => {
  it('Debería obtener una lista de programas de estudio', async () => {
    const response = await request(app).get('/api/programas_estudio');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/programas_estudio/:id', () => {
  it('Debería obtener un programa de estudio por ID', async () => {
    const response = await request(app).get(`/api/programas_estudio/${programaEstudioId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(programaEstudioId);
  });

  it('Debería manejar el caso en que el programa de estudio no existe', async () => {
    const nonExistingProgramaEstudioId = 999;
    const response = await request(app).get(`/api/programas_estudio/${nonExistingProgramaEstudioId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/programas_estudio/:id', () => {
  it('Debería actualizar un programa de estudio por ID', async () => {
    const updatedProgramaEstudioData = {
      nombre: 'programa de Estudio Actualizado'
    };
    const response = await request(app)
      .put(`/api/programas_estudio/${programaEstudioId}`)
      .send(updatedProgramaEstudioData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el programa de estudio no existe', async () => {
    const nonExistingProgramaEstudioId = 999;
    const updatedProgramaEstudioData = {
      nombre: 'programa de Estudio Actualizado'
    };
    const response = await request(app)
      .put(`/api/programas_estudio/${nonExistingProgramaEstudioId}`)
      .send(updatedProgramaEstudioData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/programas_estudio/:id', () => {
  it('Debería eliminar un programa de estudio por ID', async () => {
    const response = await request(app).delete(`/api/programas_estudio/${programaEstudioId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el programa de estudio no existe', async () => {
    const nonExistingProgramaEstudioId = 999;
    const response = await request(app).delete(`/api/programas_estudio/${nonExistingProgramaEstudioId}`);
    expect(response.status).toBe(404);
  });
});