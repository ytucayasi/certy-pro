const request = require('supertest');
const app = require('../src/app');


let ucudId;

describe('POST /api/ucud', () => {
  let unidadCompetenciaId = 0;
  let unidadDidacticaId = 0;

  it('Debería crear una nueva unidad de competencia', async () => {
    const response = await request(app)
      .post('/api/unidades_competencia')
      .send({ nombre: 'Unidad Competencia 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    unidadCompetenciaId = response.body.insertId;
  });

  it('Debería crear una nueva unidad didactica', async () => {
    const response = await request(app)
      .post('/api/unidades_didactica')
      .send({ nombre: 'Unidad Didactica 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    unidadDidacticaId = response.body.insertId;
  });

  it('Debería crear un nuevo ucud', async () => {
    const response = await request(app)
      .post('/api/ucud')
      .send({ unidad_competencia_id: unidadCompetenciaId, unidad_didactica_id: unidadDidacticaId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    ucudId = response.body.insertId;
  });
});

describe('GET /api/ucud', () => {
  it('Debería obtener una lista de ucud', async () => {
    const response = await request(app).get('/api/ucud');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/ucud/:id', () => {
  it('Debería obtener un ucud por ID', async () => {
    const response = await request(app).get(`/api/ucud/${ucudId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(ucudId);
  });

  it('Debería manejar el caso en que el ucud no existe', async () => {
    const ucudId = 999;
    const response = await request(app).get(`/api/ucud/${ucudId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/ucud/:id', () => {
  it('Debería actualizar un ucud por ID', async () => {
    const updatedUcudData = {
      unidad_competencia_id: 1,
      unidad_didactica_id: 1,
    };
    const response = await request(app)
      .put(`/api/ucud/${ucudId}`)
      .send(updatedUcudData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el ucud no existe', async () => {
    const nonExistingUcudId = 999;
    const updatedUcudData = {
      unidad_competencia_id: 1,
      unidad_didactica_id: 1,
    };
    const response = await request(app)
      .put(`/api/ucud/${nonExistingUcudId}`)
      .send(updatedUcudData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/ucud/:id', () => {
  it('Debería eliminar un ucud por ID', async () => {
    const response = await request(app).delete(`/api/ucud/${ucudId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el ucud no existe', async () => {
    const nonExistingUcudId = 999;
    const response = await request(app).delete(`/api/ucud/${nonExistingUcudId}`);
    expect(response.status).toBe(404);
  });
});