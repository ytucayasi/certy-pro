const request = require('supertest');
const app = require('../src/app');


let prId;

describe('POST /api/pr', () => {
  let rolId = 0;
  let privilegioId = 0;

  it('Debería crear un nuevo rol', async () => {
    const response = await request(app)
      .post('/api/roles')
      .send({ nombre: 'Admin', estado: 'A' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    rolId = response.body.insertId;
  });

  it('Debería crear un nuevo privilegio', async () => {
    const response = await request(app)
      .post('/api/privilegios')
      .send({ nombre: 'Admin', estado: 'A' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    privilegioId = response.body.insertId;
  });

  it('Debería crear un nuevo PR', async () => {
    const response = await request(app)
      .post('/api/pr')
      .send({ rol_id: rolId, privilegio_id: privilegioId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    prId = response.body.insertId;
  });
});

describe('GET /api/pr', () => {
  it('Debería obtener una lista de pr', async () => {
    const response = await request(app).get('/api/pr');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/pr/:id', () => {
  it('Debería obtener un PR por ID', async () => {
    const response = await request(app).get(`/api/pr/${prId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(prId);
  });

  it('Debería manejar el caso en que el PR no existe', async () => {
    const prId = 999;
    const response = await request(app).get(`/api/pr/${prId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/pr/:id', () => {
  it('Debería actualizar un PR por ID', async () => {
    const updatedPrData = {
      privilegio_id: 1,
      rol_id: 1,
    };
    const response = await request(app)
      .put(`/api/pr/${prId}`)
      .send(updatedPrData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el PR no existe', async () => {
    const nonExistingPrId = 999;
    const updatedPrData = {
      privilegio_id: 1,
      rol_id: 1,
    };
    const response = await request(app)
      .put(`/api/pr/${nonExistingPrId}`)
      .send(updatedPrData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/pr/:id', () => {
  it('Debería eliminar un PR por ID', async () => {
    const response = await request(app).delete(`/api/pr/${prId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el PR no existe', async () => {
    const nonExistingPrId = 999;
    const response = await request(app).delete(`/api/pr/${nonExistingPrId}`);
    expect(response.status).toBe(404);
  });
});