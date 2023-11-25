const request = require('supertest');
const app = require('../src/app');

let usuarioId;

describe('POST /api/usuarios', () => {
  it('Debería crear un nuevo usuario', async () => {
    const response = await request(app)
      .post('/api/usuarios')
      .send({ nombre: 'Usuario de prueba', correo: 'prueba@example.com', clave: 'password', estado: '0' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    usuarioId = response.body.insertId;
  });
});

describe('GET /api/usuarios', () => {
  it('Debería obtener una lista de usuarios', async () => {
    const response = await request(app).get('/api/usuarios');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/usuarios/:id', () => {
  it('Debería obtener un usuario por ID', async () => {
    const response = await request(app).get(`/api/usuarios/${usuarioId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(usuarioId);
  });

  it('Debería manejar el caso en que el usuario no existe', async () => {
    const userId = 999;
    const response = await request(app).get(`/api/usuarios/${userId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/usuarios/:id', () => {
  it('Debería actualizar un usuario por ID', async () => {
    const updatedUserData = { nombre: 'Usuario Actualizado', correo: 'prueba@example.com', clave: 'password', estado: '1' };
    const response = await request(app)
      .put(`/api/usuarios/${usuarioId}`)
      .send(updatedUserData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el usuario no existe', async () => {
    const userId = 999;
    const updatedUserData = { nombre: 'Usuario Actualizado' };
    const response = await request(app)
      .put(`/api/usuarios/${userId}`)
      .send(updatedUserData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/usuarios/:id', () => {
  it('Debería eliminar un usuario por ID', async () => {
    const response = await request(app).delete(`/api/usuarios/${usuarioId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el usuario no existe', async () => {
    const userId = 999;
    const response = await request(app).delete(`/api/usuarios/${userId}`);
    expect(response.status).toBe(404);
  });
});