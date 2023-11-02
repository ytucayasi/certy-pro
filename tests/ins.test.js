const request = require('supertest');
const app = require('../src/app');

let insId;

describe('POST /api/ins', () => {
  it('Debería crear una nueva entidad Ins', async () => {
    const response = await request(app)
      .post('/api/ins')
      .send({ nombre: 'Nombre de Ins', codigo: 'INS123', url_logo: 'https://example.com/logo.png', responsable: 'Responsable Ins', sector: '0' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    insId = response.body.insertId;
  });
});

describe('GET /api/ins', () => {
  it('Debería obtener una lista de entidades Ins', async () => {
    const response = await request(app).get('/api/ins');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/ins/:id', () => {
  it('Debería obtener una entidad Ins por ID', async () => {
    const response = await request(app).get(`/api/ins/${insId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(insId);
  });

  it('Debería manejar el caso en que la entidad Ins no existe', async () => {
    const insId = 999;
    const response = await request(app).get(`/api/ins/${insId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/ins/:id', () => {
  it('Debería actualizar una entidad Ins por ID', async () => {
    const updatedInsData = { nombre: 'Nombre Actualizado', codigo: 'INS456', url_logo: 'https://example.com/logo_actualizado.png', responsable: 'Nuevo Responsable', sector: '1' };
    const response = await request(app)
      .put(`/api/ins/${insId}`)
      .send(updatedInsData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que la entidad Ins no existe', async () => {
    const insId = 999;
    const updatedInsData = { nombre: 'Nombre Actualizado' };
    const response = await request(app)
      .put(`/api/ins/${insId}`)
      .send(updatedInsData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/ins/:id', () => {
  it('Debería eliminar una entidad Ins por ID', async () => {
    const response = await request(app).delete(`/api/ins/${insId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que la entidad Ins no existe', async () => {
    const insId = 999;
    const response = await request(app).delete(`/api/ins/${insId}`);
    expect(response.status).toBe(404);
  });
});
