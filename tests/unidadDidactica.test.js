const request = require('supertest');
const app = require('../src/app');

let unidadDidacticaId;

describe('POST /api/unidades_didactica', () => {
  it('Debería crear una nueva unidad didactica', async () => {
    const response = await request(app)
      .post('/api/unidades_didactica')
      .send({ nombre: 'Unidad Didactica 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    unidadDidacticaId = response.body.insertId;
  });
});

describe('GET /api/unidades_didactica', () => {
  it('Debería obtener una lista de unidades didactica', async () => {
    const response = await request(app).get('/api/unidades_didactica');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/unidades_didactica/:id', () => {
  it('Debería obtener una unidad didactica por ID', async () => {
    const response = await request(app).get(`/api/unidades_didactica/${unidadDidacticaId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(unidadDidacticaId);
  });

  it('Debería manejar el caso en que la unidad didactica no existe', async () => {
    const nonExistingUnidadDidacticaId = 999;
    const response = await request(app).get(`/api/unidades_didactica/${nonExistingUnidadDidacticaId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/unidades_didactica/:id', () => {
  it('Debería actualizar una unidad didactica por ID', async () => {
    const updatedUnidadDidacticaData = {
      nombre: 'Unidad didactica Actualizado'
    };
    const response = await request(app)
      .put(`/api/unidades_didactica/${unidadDidacticaId}`)
      .send(updatedUnidadDidacticaData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que la unidad didactica no existe', async () => {
    const nonExistingUnidadDidacticaId = 999;
    const updatedUnidadDidacticaData = {
      nombre: 'Unidad didactica Actualizado'
    };
    const response = await request(app)
      .put(`/api/unidades_didactica/${nonExistingUnidadDidacticaId}`)
      .send(updatedUnidadDidacticaData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/unidades_didactica/:id', () => {
  it('Debería eliminar una unidad didactica por ID', async () => {
    const response = await request(app).delete(`/api/unidades_didactica/${unidadDidacticaId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que la unidad didactica no existe', async () => {
    const nonExistingUnidadDidacticaId = 999;
    const response = await request(app).delete(`/api/unidades_didactica/${nonExistingUnidadDidacticaId}`);
    expect(response.status).toBe(404);
  });
});