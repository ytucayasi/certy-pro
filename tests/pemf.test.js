const request = require('supertest');
const app = require('../src/app');


let pemfId;

describe('POST /api/pemf', () => {
  let programaEstudioId = 0;
  let moduloFormativoId = 0;

  it('Debería crear un nuevo programa de estudio', async () => {
    const response = await request(app)
      .post('/api/programas_estudio')
      .send({ nombre: 'programa de Estudio 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    programaEstudioId = response.body.insertId;
  });

  it('Debería crear un nuevo modulo formativo', async () => {
    const response = await request(app)
      .post('/api/modulos_formativo')
      .send({ nombre: 'modulo formativo pemf' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    moduloFormativoId = response.body.insertId;
  });

  it('Debería crear un nuevo pemf', async () => {
    const response = await request(app)
      .post('/api/pemf')
      .send({ programa_estudio_id: programaEstudioId, modulo_formativo_id: moduloFormativoId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    pemfId = response.body.insertId;
  });
});

describe('GET /api/pemf', () => {
  it('Debería obtener una lista de pemf', async () => {
    const response = await request(app).get('/api/pemf');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/pemf/:id', () => {
  it('Debería obtener un pemf por ID', async () => {
    const response = await request(app).get(`/api/pemf/${pemfId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(pemfId);
  });

  it('Debería manejar el caso en que el pemf no existe', async () => {
    const pemfId = 999;
    const response = await request(app).get(`/api/pemf/${pemfId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/pemf/:id', () => {
  it('Debería actualizar un pemf por ID', async () => {
    const updatedPemfData = {
      programa_estudio_id: 1,
      modulo_formativo_id: 1,
    };
    const response = await request(app)
      .put(`/api/pemf/${pemfId}`)
      .send(updatedPemfData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el pemf no existe', async () => {
    const nonExistingPemfId = 999;
    const updatedPemfData = {
      programa_estudio_id: 1,
      modulo_formativo_id: 1,
    };
    const response = await request(app)
      .put(`/api/pemf/${nonExistingPemfId}`)
      .send(updatedPemfData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/pemf/:id', () => {
  it('Debería eliminar un pemf por ID', async () => {
    const response = await request(app).delete(`/api/pemf/${pemfId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el pemf no existe', async () => {
    const nonExistingPemfId = 999;
    const response = await request(app).delete(`/api/pemf/${nonExistingPemfId}`);
    expect(response.status).toBe(404);
  });
});