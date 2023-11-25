const request = require('supertest');
const app = require('../src/app');


let mfucId;

describe('POST /api/mfuc', () => {
  let moduloFormativoId = 0;
  let unidadCompetenciaId = 0;

  it('Debería crear un nuevo modulo formativo', async () => {
    const response = await request(app)
      .post('/api/modulos_formativo')
      .send({ nombre: 'modulo formativo mfuc' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    moduloFormativoId = response.body.insertId;
  });

  it('Debería crear una nueva unidad de competencia', async () => {
    const response = await request(app)
      .post('/api/unidades_competencia')
      .send({ nombre: 'Unidad Competencia 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    unidadCompetenciaId = response.body.insertId;
  });

  it('Debería crear un nuevo mfuc', async () => {
    const response = await request(app)
      .post('/api/mfuc')
      .send({ modulo_formativo_id: moduloFormativoId, unidad_competencia_id: unidadCompetenciaId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    mfucId = response.body.insertId;
  });
});

describe('GET /api/mfuc', () => {
  it('Debería obtener una lista de mfuc', async () => {
    const response = await request(app).get('/api/mfuc');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/mfuc/:id', () => {
  it('Debería obtener un mfuc por ID', async () => {
    const response = await request(app).get(`/api/mfuc/${mfucId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(mfucId);
  });

  it('Debería manejar el caso en que el mfuc no existe', async () => {
    const mfucId = 999;
    const response = await request(app).get(`/api/mfuc/${mfucId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/mfuc/:id', () => {
  it('Debería actualizar un mfuc por ID', async () => {
    const updatedMfucData = {
      modulo_formativo_id: 1,
      unidad_competencia_id: 1,
    };
    const response = await request(app)
      .put(`/api/mfuc/${mfucId}`)
      .send(updatedMfucData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el mfuc no existe', async () => {
    const nonExistingMfucId = 999;
    const updatedMfucData = {
      modulo_formativo_id: 1,
      unidad_competencia_id: 1,
    };
    const response = await request(app)
      .put(`/api/mfuc/${nonExistingMfucId}`)
      .send(updatedMfucData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/mfuc/:id', () => {
  it('Debería eliminar un mfuc por ID', async () => {
    const response = await request(app).delete(`/api/mfuc/${mfucId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el mfuc no existe', async () => {
    const nonExistingMfucId = 999;
    const response = await request(app).delete(`/api/mfuc/${nonExistingMfucId}`);
    expect(response.status).toBe(404);
  });
});