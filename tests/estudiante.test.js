const request = require('supertest');
const app = require('../src/app');

let estudianteId;

describe('POST /api/estudiantes', () => {
  let usuarioId = 0;
  it('Debería crear un nuevo usuario', async () => {
    const response = await request(app)
      .post('/api/usuarios')
      .send({ nombre: 'Usuario de prueba', correo: 'prueba@example.com', clave: 'password', estado: '1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    usuarioId = response.body.insertId;
  });

  it('Debería crear un nuevo estudiante', async () => {
    const response = await request(app)
      .post('/api/estudiantes')
      .send({ nombres: 'Nombres del Estudiante', apellidos: 'Apellidos del Estudiante', foto: 'https://example.com/foto.jpg', dni: '74701343', codigo_universitario: '202012379', fecha_nacimiento: '2000-01-01', usuario_id: usuarioId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    estudianteId = response.body.insertId;
  });
});

describe('GET /api/estudiantes', () => {
  it('Debería obtener una lista de estudiantes', async () => {
    const response = await request(app).get('/api/estudiantes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
}); 

describe('GET /api/estudiantes/:id', () => {
  it('Debería obtener un estudiante por ID', async () => {
    const response = await request(app).get(`/api/estudiantes/${estudianteId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(estudianteId);
  });

  it('Debería manejar el caso en que el estudiante no existe', async () => {
    const estudianteId = 999;
    const response = await request(app).get(`/api/estudiantes/${estudianteId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/estudiantes/:id', () => {
  it('Debería actualizar un estudiante por ID', async () => {
    const updatedEstudianteData = { nombres: 'Nombres Actualizados', apellidos: 'Apellidos Actualizados', foto: 'https://example.com/foto_actualizada.jpg', dni: '74701343', codigo_universitario: '123456789', fecha_nacimiento: '1999-12-31' };
    const response = await request(app)
      .put(`/api/estudiantes/${estudianteId}`)
      .send(updatedEstudianteData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el estudiante no existe', async () => {
    const estudianteId = 999;
    const updatedEstudianteData = { nombres: 'Nombres Actualizados' };
    const response = await request(app)
      .put(`/api/estudiantes/${estudianteId}`)
      .send(updatedEstudianteData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/estudiantes/:id', () => {
  it('Debería eliminar un estudiante por ID', async () => {
    const response = await request(app).delete(`/api/estudiantes/${estudianteId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el estudiante no existe', async () => {
    const estudianteId = 999;
    const response = await request(app).delete(`/api/estudiantes/${estudianteId}`);
    expect(response.status).toBe(404);
  });
});
