const request = require('supertest');
const app = require('../src/app');

let documentoId;

describe('POST /api/documentos', () => {
  it('Debería crear un nuevo documento', async () => {
    const response = await request(app)
      .post('/api/documentos')
      .send({ url_doc: 'https://example.com/documento.pdf', estado: '1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    documentoId = response.body.insertId;
  });
});

describe('GET /api/documentos', () => {
  it('Debería obtener una lista de documentos', async () => {
    const response = await request(app).get('/api/documentos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/documentos/:id', () => {
  it('Debería obtener un documento por ID', async () => {
    const response = await request(app).get(`/api/documentos/${documentoId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(documentoId);
  });

  it('Debería manejar el caso en que el documento no existe', async () => {
    const documentoId = 999;
    const response = await request(app).get(`/api/documentos/${documentoId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/documentos/:id', () => {
  it('Debería actualizar un documento por ID', async () => {
    const updatedDocumentoData = { url_doc: 'https://example.com/documento_actualizado.pdf', estado: '0' };
    const response = await request(app)
      .put(`/api/documentos/${documentoId}`)
      .send(updatedDocumentoData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el documento no existe', async () => {
    const documentoId = 999;
    const updatedDocumentoData = { url_doc: 'https://example.com/documento_actualizado.pdf' };
    const response = await request(app)
      .put(`/api/documentos/${documentoId}`)
      .send(updatedDocumentoData);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/documentos/:id', () => {
  it('Debería eliminar un documento por ID', async () => {
    const response = await request(app).delete(`/api/documentos/${documentoId}`);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el documento no existe', async () => {
    const documentoId = 999;
    const response = await request(app).delete(`/api/documentos/${documentoId}`);
    expect(response.status).toBe(404);
  });
});