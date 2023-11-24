const request = require('supertest');
const app = require('../src/app');

let documentoCopiaId;

describe('POST /api/documento_copia', () => {
  let documentoId = 0;

  it('Debería crear un nuevo documento', async () => {
    const response = await request(app)
      .post('/api/documentos')
      .send({ url_doc: 'https://example.com/documento.pdf', estado: '1' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    documentoId = response.body.insertId;
  });

  it('Debería crear un nuevo documento copia', async () => {
    const response = await request(app)
      .post('/api/documento_copia')
      .send({ url_doc: 'https://example.com/documento_copia.pdf', estado: 'A', tipo: 'T', documento_id: documentoId });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('affectedRows', 1);
    documentoCopiaId = response.body.insertId;
  });
});

describe('GET /api/documento_copia', () => {
  it('Debería obtener una lista de documentos copia', async () => {
    const response = await request(app).get('/api/documento_copia');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/documento_copia/:id', () => {
  it('Debería obtener un documento copia por ID', async () => {
    const response = await request(app).get(`/api/documento_copia/${documentoCopiaId}`);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.id, 10)).toBe(documentoCopiaId);
  });

  it('Debería manejar el caso en que el documento copia no existe', async () => {
    const documentoCopiaId = 999;
    const response = await request(app).get(`/api/documento_copia/${documentoCopiaId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/documento_copia/:id', () => {
  it('Debería actualizar un documento copia por ID', async () => {
    const updatedDocumentoCopiaData = {
      url_doc: 'https://example-update.com/documento_copia.pdf',
      estado: 'B',
      tipo: 'S',
      documento_id: 2
    };
    const response = await request(app)
      .put(`/api/documento_copia/${documentoCopiaId}`)
      .send(updatedDocumentoCopiaData);
    expect(response.status).toBe(200);
  });

  it('Debería manejar el caso en que el documento copia no existe', async () => {
    const documentoCopiaId = 999;
    const updatedDocumentoCopiaData = {
      url_doc: 'https://example-update.com/documento_copia.pdf',
      estado: 'B',
      tipo: 'S',
      documento_id: 2
    };
    const response = await request(app)
      .put(`/api/documento_copia/${documentoCopiaId}`)
      .send(updatedDocumentoCopiaData);
    expect(response.status).toBe(404);
  });
});

// describe('DELETE /api/documento_copia/:id', () => {
//   it('Debería eliminar un documento copia por ID', async () => {
//     const response = await request(app).delete(`/api/documento_copia/${documentoCopiaId}`);
//     expect(response.status).toBe(200);
//   });

//   it('Debería manejar el caso en que el documento copia no existe', async () => {
//     const documentoCopiaId = 999;
//     const response = await request(app).delete(`/api/documento_copia/${documentoCopiaId}`);
//     expect(response.status).toBe(404);
//   });
// });
