const request = require('supertest');
const app = require('../src/app');

let certificadoId;

describe('POST /api/certificados', () => {
  let estudianteId = 0;
  let usuarioId = 0;
  let documentoId = 0;
  let nivelAcademicoId = 0;

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
      .send({ nombres: 'Nombres del Estudiante', apellidos: 'Apellidos del Estudiante', foto: 'https://example.com/foto.jpg', dni: '74701343', codigo_universitario: '202012379', fecha_nacimiento: '2000-01-01', usuario_id: usuarioId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    estudianteId = response.body.insertId;
  });

  it('Debería crear un nuevo documento', async () => {
    const response = await request(app)
      .post('/api/documentos')
      .send({ url_doc: 'https://example.com/documento.pdf', estado: '1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    documentoId = response.body.insertId;
  });

  it('Debería crear un nuevo nivel académico', async () => {
    const response = await request(app)
      .post('/api/niveles-academicos')
      .send({ nivel: '2', tipo: '1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    nivelAcademicoId = response.body.insertId;
  });

  it('Debería crear un nuevo certificado', async () => {
    const response = await request(app)
      .post('/api/certificados')
      .send({
        estado: '1',
        codigo: 'CERT123',
        creditos: 60,
        horas: 120,
        lugar: 'Lugar del Certificado',
        fecha_creacion: '2023-01-15',
        nivel_academico_id: nivelAcademicoId,
        documento_id: documentoId,
        estudiante_id: estudianteId,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    certificadoId = response.body.insertId;
  });
});

describe('GET /api/certificados', () => {
  it('Debería obtener una lista de certificados', async () => {
    const response = await request(app).get('/api/certificados');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/certificados/:id', () => {
  it('Debería obtener un certificado por ID', async () => {
    const response = await request(app).get(`/api/certificados/${certificadoId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(certificadoId);
  });

  it('Debería manejar el caso en que el certificado no existe', async () => {
    const certificadoId = 999;
    const response = await request(app).get(`/api/certificados/${certificadoId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/certificados/:id', () => {
  it('Debería actualizar un certificado por ID', async () => {
    const updatedCertificadoData = {
      estado: '0',
      codigo: 'CERT456',
      creditos: 90,
      horas: 180,
      lugar: 'Nuevo Lugar del Certificado',
      fecha_creacion: '2023-02-20'
    };
    const response = await request(app)
      .put(`/api/certificados/${certificadoId}`)
      .send(updatedCertificadoData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el certificado no existe', async () => {
    const certificadoId = 999;
    const updatedCertificadoData = { codigo: 'CERT789' };
    const response = await request(app)
      .put(`/api/certificados/${certificadoId}`)
      .send(updatedCertificadoData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/certificados/:id', () => {
  it('Debería eliminar un certificado por ID', async () => {
    const response = await request(app).delete(`/api/certificados/${certificadoId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el certificado no existe', async () => {
    const certificadoId = 999;
    const response = await request(app).delete(`/api/certificados/${certificadoId}`);
    expect(response.status).toBe(404);
  });
});
