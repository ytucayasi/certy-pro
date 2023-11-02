class Estudiante {
  constructor({ id, nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento }) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.foto = foto;
    this.dni = dni;
    this.codigo_universitario = codigo_universitario;
    this.fecha_nacimiento = fecha_nacimiento;
  }
}

module.exports = Estudiante;