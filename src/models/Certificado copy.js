class Certificado {
  constructor({ id, nombre_certificado, tipo, estado, codigo, creditos, horas, lugar, fecha_creacion, nivel_academico_id, documento_id, estudiante_id }) {
    this.id = id;
    this.nombre_certificado = nombre_certificado;
    this.tipo = tipo;
    this.estado = estado;
    this.codigo = codigo;
    this.creditos = creditos;
    this.horas = horas;
    this.lugar = lugar;
    this.fecha_creacion = fecha_creacion;
    this.nivel_academico_id = nivel_academico_id;
    this.documento_id = documento_id;
    this.estudiante_id = estudiante_id;
  }
}

module.exports = Certificado;