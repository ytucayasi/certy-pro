const request = require('supertest');
const app = require('../src/app');

let ruId;

describe('POST /api/ru', () => {
  let roleId = 0;
  let userId = 0;

  it('Debería crear un nuevo rol', async () => {
    const response = await request(app)
      .post('/api/roles')
      .send({ nombre: 'Admin', estado: 'A' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    roleId = response.body.insertId;
  });

  it('Debería crear un nuevo usuario', async () => {
    const response = await request(app)
      .post('/api/usuarios')
      .send({ nombre: 'Usuario de prueba', correo: 'prueba@example.com', clave: 'password', estado: '0' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    userId = response.body.insertId;
  });

  it('Debería crear un nuevo RU', async () => {
    const response = await request(app)
      .post('/api/ru')
      .send({ rol_id: roleId, usuario_id: userId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    ruId = response.body.insertId;
  });
});

describe('GET /api/ru', () => {
  it('Debería obtener una lista de RU', async () => {
    const response = await request(app).get('/api/ru');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/ru/:id', () => {
  it('Debería obtener un RU por ID', async () => {
    const response = await request(app).get(`/api/ru/${ruId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(ruId);
  });

  it('Debería manejar el caso en que el RU no existe', async () => {
    const nonExistingRuId = 999;
    const response = await request(app).get(`/api/ru/${nonExistingRuId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/ru/:id', () => {
  it('Debería actualizar un RU por ID', async () => {
    const updatedRuData = {
      rol_id: 2,
      usuario_id: 2,
    };
    const response = await request(app)
      .put(`/api/ru/${ruId}`)
      .send(updatedRuData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el RU no existe', async () => {
    const nonExistingRuId = 999;
    const updatedRuData = {
      rol_id: 2,
      usuario_id: 2,
    };
    const response = await request(app)
      .put(`/api/ru/${nonExistingRuId}`)
      .send(updatedRuData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/ru/:id', () => {
  it('Debería eliminar un RU por ID', async () => {
    const response = await request(app).delete(`/api/ru/${ruId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el RU no existe', async () => {
    const nonExistingRuId = 999;
    const response = await request(app).delete(`/api/ru/${nonExistingRuId}`);
    expect(response.status).toBe(404);
  });
});
