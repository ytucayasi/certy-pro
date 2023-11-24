const request = require('supertest');
const app = require('../src/app');

let privilegioId;

describe('POST /api/privilegios', () => {
  it('Debería crear un nuevo privilegio', async () => {
    const response = await request(app)
      .post('/api/privilegios')
      .send({ nombre: 'Admin', estado: 'A' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    privilegioId = response.body.insertId;
  });
});

describe('GET /api/privilegios', () => {
  it('Debería obtener una lista de privilegios', async () => {
    const response = await request(app).get('/api/privilegios');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/privilegios/:id', () => {
  it('Debería obtener un privilegio por ID', async () => {
    const response = await request(app).get(`/api/privilegios/${privilegioId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(privilegioId);
  });

  it('Debería manejar el caso en que el privilegio no existe', async () => {
    const privilegioId = 999;
    const response = await request(app).get(`/api/privilegios/${privilegioId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/privilegios/:id', () => {
  it('Debería actualizar un privilegio por ID', async () => {
    const updatedPrivilegioData = { nombre: 'Moderador', estado: 'A' };
    const response = await request(app)
      .put(`/api/privilegios/${privilegioId}`)
      .send(updatedPrivilegioData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el privilegio no existe', async () => {
    const privilegioId = 999;
    const updatedPrivilegioData = { nombre: 'Moderador' };
    const response = await request(app)
      .put(`/api/privilegios/${privilegioId}`)
      .send(updatedPrivilegioData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/privilegios/:id', () => {
  it('Debería eliminar un privilegio por ID', async () => {
    const response = await request(app).delete(`/api/privilegios/${privilegioId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el privilegio no existe', async () => {
    const privilegioId = 999;
    const response = await request(app).delete(`/api/privilegios/${privilegioId}`);
    expect(response.status).toBe(404);
  });
});
