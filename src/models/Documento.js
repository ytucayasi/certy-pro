class Documento {
  constructor({ id, url_doc, estado }) {
    this.id = id;
    this.url_doc = url_doc;
    this.estado = estado;
  }
  // método para obtener la URL completa del documento
  getURLCompleta() {
    return this.url_doc;
  }
}

module.exports = Documento;