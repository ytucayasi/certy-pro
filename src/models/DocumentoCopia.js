class DocumentoCopia {
  constructor({ id, url_doc, estado, tipo, documento_id }) {
    this.id = id;
    this.url_doc = url_doc;
    this.estado = estado;
    this.tipo = tipo;
    this.documento_id = documento_id;
  }
}

module.exports = DocumentoCopia;