const request = require('supertest');
const app = require('../src/app');

let moduloFormativoId;

describe('POST /api/modulos_formativo', () => {
  it('Debería crear un nuevo modulo formativo', async () => {
    const response = await request(app)
      .post('/api/modulos_formativo')
      .send({ nombre: 'modulo formativo 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    moduloFormativoId = response.body.insertId;
  });
});

describe('GET /api/modulos_formativo', () => {
  it('Debería obtener una lista de programas de estudio', async () => {
    const response = await request(app).get('/api/modulos_formativo');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/modulos_formativo/:id', () => {
  it('Debería obtener un modulo formativo por ID', async () => {
    const response = await request(app).get(`/api/modulos_formativo/${moduloFormativoId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(moduloFormativoId);
  });

  it('Debería manejar el caso en que el modulo formativo no existe', async () => {
    const nonExistingModuloFormativoId = 999;
    const response = await request(app).get(`/api/modulos_formativo/${nonExistingModuloFormativoId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/modulos_formativo/:id', () => {
  it('Debería actualizar un modulo formativo por ID', async () => {
    const updatedModuloFormativoData = {
      nombre: 'modulo formativo Actualizado'
    };
    const response = await request(app)
      .put(`/api/modulos_formativo/${moduloFormativoId}`)
      .send(updatedModuloFormativoData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el modulo formativo no existe', async () => {
    const nonExistingModuloFormativoId = 999;
    const updatedModuloFormativoData = {
      nombre: 'modulo formativo Actualizado'
    };
    const response = await request(app)
      .put(`/api/modulos_formativo/${nonExistingModuloFormativoId}`)
      .send(updatedModuloFormativoData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/modulos_formativo/:id', () => {
  it('Debería eliminar un modulo formativo por ID', async () => {
    const response = await request(app).delete(`/api/modulos_formativo/${moduloFormativoId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el modulo formativo no existe', async () => {
    const nonExistingModuloFormativoId = 999;
    const response = await request(app).delete(`/api/modulos_formativo/${nonExistingModuloFormativoId}`);
    expect(response.status).toBe(404);
  });
});