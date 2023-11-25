const request = require('supertest');
const app = require('../src/app');

let peeId;

describe('POST /api/pee', () => {
  let usuarioId = 0;
  let estudianteId = 0;
  let planEstudioId = 0;

  it('Debería crear un nuevo usuario', async () => {
    const response = await request(app)
      .post('/api/usuarios')
      .send({ nombre: 'Usuario de prueba', correo: 'prueba@example.com', clave: 'password', estado: '0' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    usuarioId = response.body.insertId;
  });

  it('Debería crear un nuevo estudiante', async () => {
    const response = await request(app)
      .post('/api/estudiantes')
      .send({ nombres: 'lucas', apellidos: 'peres', foto: 'https://example.com/foto.jpg', dni: '74701343', codigo_universitario: '202012379', fecha_nacimiento: '2000-01-01', usuario_id: usuarioId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    estudianteId = response.body.insertId;
  });

  it('Debería crear un nuevo plan de estudio', async () => {
    const response = await request(app)
      .post('/api/planes_estudio')
      .send({ nombre: 'Plan de Estudio 1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    planEstudioId = response.body.insertId;
  });

  it('Debería crear un nuevo PEE', async () => {
    const response = await request(app)
      .post('/api/pee')
      .send({ estudiante_id: estudianteId, plan_estudio_id: planEstudioId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    peeId = response.body.insertId;
  });
});

describe('GET /api/pee', () => {
  it('Debería obtener una lista de PEE', async () => {
    const response = await request(app).get('/api/pee');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/pee/:id', () => {
  it('Debería obtener un PEE por ID', async () => {
    const response = await request(app).get(`/api/pee/${peeId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(peeId);
  });

  it('Debería manejar el caso en que el PEE no existe', async () => {
    const nonExistingPEEId = 999;
    const response = await request(app).get(`/api/pee/${nonExistingPEEId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/pee/:id', () => {
  it('Debería actualizar un PEE por ID', async () => {
    const updatedPeeData = {
      estudiante_id: 1,
      plan_estudio_id: 1,
    };
    const response = await request(app)
      .put(`/api/pee/${peeId}`)
      .send(updatedPeeData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el PEE no existe', async () => {
    const nonExistingPEEId = 999;
    const updatedPeeData = {
      estudiante_id: 1,
      plan_estudio_id: 1,
    };
    const response = await request(app)
      .put(`/api/pee/${nonExistingPEEId}`)
      .send(updatedPeeData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/pee/:id', () => {
  it('Debería eliminar un PEE por ID', async () => {
    const response = await request(app).delete(`/api/pee/${peeId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el PEE no existe', async () => {
    const nonExistingPeeId = 999;
    const response = await request(app).delete(`/api/pee/${nonExistingPeeId}`);
    expect(response.status).toBe(404);
  });
});
