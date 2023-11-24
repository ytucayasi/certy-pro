const request = require('supertest');
const app = require('../src/app');

let roleId;

describe('POST /api/roles', () => {
  it('Debería crear un nuevo rol', async () => {
    const response = await request(app)
      .post('/api/roles')
      .send({ nombre: 'Admin', estado: 'A' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    roleId = response.body.insertId;
  });
});

describe('GET /api/roles', () => {
  it('Debería obtener una lista de roles', async () => {
    const response = await request(app).get('/api/roles');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/roles/:id', () => {
  it('Debería obtener un rol por ID', async () => {
    const response = await request(app).get(`/api/roles/${roleId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(roleId);
  });

  it('Debería manejar el caso en que el rol no existe', async () => {
    const roleId = 999;
    const response = await request(app).get(`/api/roles/${roleId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/roles/:id', () => {
  it('Debería actualizar un rol por ID', async () => {
    const updatedRolData = {
      nombre: 'Moderador',
      estado: 'A'
    };
    const response = await request(app)
      .put(`/api/roles/${roleId}`)
      .send(updatedRolData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el rol no existe', async () => {
    const roleId = 999;
    const updatedRolData = { nombre: 'Nuevo nombre' };
    const response = await request(app)
      .put(`/api/roles/${roleId}`)
      .send(updatedRolData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/roles/:id', () => {
  it('Debería eliminar un rol por ID', async () => {
    const response = await request(app).delete(`/api/roles/${roleId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el rol no existe', async () => {
    const roleId = 999;
    const response = await request(app).delete(`/api/roles/${roleId}`);
    expect(response.status).toBe(404);
  });
});
