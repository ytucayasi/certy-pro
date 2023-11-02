class Estudiante {
  constructor({ id, nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, usuario_id }) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.foto = foto;
    this.dni = dni;
    this.codigo_universitario = codigo_universitario;
    this.fecha_nacimiento = fecha_nacimiento;
    this.usuario_id = usuario_id;
  }
}

module.exports = Estudiante;