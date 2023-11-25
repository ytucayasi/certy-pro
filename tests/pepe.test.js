const request = require('supertest');
const app = require('../src/app');


let pepeId;

describe('POST /api/pepe', () => {
  let planEstudioId = 0;
  let programaEstudioId = 0;

  it('Debería crear un nuevo plan de estudio', async () => {
    const response = await request(app)
      .post('/api/planes_estudio')
      .send({ nombre: 'Plan de Estudio pepe' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    planEstudioId = response.body.insertId;
  });

  it('Debería crear un nuevo programa de estudio', async () => {
    const response = await request(app)
      .post('/api/programas_estudio')
      .send({ nombre: 'programa de Estudio 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    programaEstudioId = response.body.insertId;
  });

  it('Debería crear un nuevo PEPE', async () => {
    const response = await request(app)
      .post('/api/pepe')
      .send({ plan_estudio_id: planEstudioId, programa_estudio_id: programaEstudioId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    pepeId = response.body.insertId;
  });
});

describe('GET /api/pepe', () => {
  it('Debería obtener una lista de pepe', async () => {
    const response = await request(app).get('/api/pepe');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/pepe/:id', () => {
  it('Debería obtener un PEPE por ID', async () => {
    const response = await request(app).get(`/api/pepe/${pepeId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(pepeId);
  });

  it('Debería manejar el caso en que el PEPE no existe', async () => {
    const pepeId = 999;
    const response = await request(app).get(`/api/pepe/${pepeId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/pepe/:id', () => {
  it('Debería actualizar un PEPE por ID', async () => {
    const updatedPepeData = {
      plan_estudio_id: 1,
      programa_estudio_id: 1,
    };
    const response = await request(app)
      .put(`/api/pepe/${pepeId}`)
      .send(updatedPepeData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el PEPE no existe', async () => {
    const nonExistingPepeId = 999;
    const updatedPepeData = {
      plan_estudio_id: 1,
      programa_estudio_id: 1,
    };
    const response = await request(app)
      .put(`/api/pepe/${nonExistingPepeId}`)
      .send(updatedPepeData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/pepe/:id', () => {
  it('Debería eliminar un PEPE por ID', async () => {
    const response = await request(app).delete(`/api/pepe/${pepeId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el PEPE no existe', async () => {
    const nonExistingPepeId = 999;
    const response = await request(app).delete(`/api/pepe/${nonExistingPepeId}`);
    expect(response.status).toBe(404);
  });
});