class Ins {
  constructor({ id, nombre, codigo, url_logo, responsable, sector }) {
    this.id = id;
    this.nombre = nombre;
    this.codigo = codigo;
    this.url_logo = url_logo;
    this.responsable = responsable;
    this.sector = sector;
  }
  //método para obtener información detallada del INS
  obtenerInformacionDetallada() {
    return {
      id: this.id,
      nombre: this.nombre,
      codigo: this.codigo,
      url_logo: this.url_logo,
      responsable: this.responsable,
      sector: this.sector
    };
  }
}

module.exports = Ins;