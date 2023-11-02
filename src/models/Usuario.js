class Usuario {
  constructor({ id, nombre, correo, clave, estado }) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.clave = clave;
    this.estado = estado;
  }
}

module.exports = Usuario;