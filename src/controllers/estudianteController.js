const Estudiante = require('../models/Estudiante');
const {
  crearEstudiante,
  obtenerTodosEstudiantes,
  obtenerEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  obtenerEstudianteUsuario,
  obtenerEstudianteUsuarioPorCod,
  crearUsuarioYEstudiante,
  actualizarUsuarioYEstudiante,
  eliminarEstudianteYUsuario
} = require('../repositories/estudianteRepository');

const crearNuevoEstudiante = (req, res) => {
  const nuevoEstudiante = new Estudiante(req.body);
  crearEstudiante(nuevoEstudiante, (err, result) => {
    if (err) {
      console.error('Error al crear un estudiante:', err);
      res.status(500).json({ message: 'Error al crear un estudiante' });
      return;
    }
    res.status(201).json(result);
  });
};

const crearNuevoEstudianteYUsuario = (req, res) => {
  const { nombre, correo, clave, estado, nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento } = req.body;
  const datos = {
    nombre,
    correo,
    clave,
    estado,
    nombres,
    apellidos,
    foto,
    dni,
    codigo_universitario,
    fecha_nacimiento,
  };
  crearUsuarioYEstudiante(datos, (err, result) => {
    if (err) {
      console.error('Error al crear un estudiante:', err);
      res.status(500).json({ message: 'Error al crear un estudiante' });
      return;
    }
    res.status(201).json(result);
  });
};

const actualizarEstudianteYUsuario = (req, res) => {
  const idUsuario = req.params.id; // Suponiendo que el ID del usuario está en los parámetros de la solicitud
  const { nombre, correo, clave, estado, nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento } = req.body;
  
  const datos = {
    nombre,
    correo,
    clave,
    estado,
    nombres,
    apellidos,
    foto,
    dni,
    codigo_universitario,
    fecha_nacimiento,
  };

  actualizarUsuarioYEstudiante(idUsuario, datos, (err, result) => {
    if (err) {
      console.error('Error al actualizar un estudiante:', err);
      res.status(500).json({ message: 'Error al actualizar un estudiante' });
      return;
    }
    res.status(200).json(result);
  });
};

const eliminarEstudianteConUsuario = (req, res) => {
  const idUsuario = req.params.id; // Suponiendo que el ID del usuario está en los parámetros de la solicitud

  eliminarEstudianteYUsuario(idUsuario, (err, result) => {
    if (err) {
      console.error('Error al eliminar estudiante y usuario:', err);
      res.status(500).json({ message: 'Error al eliminar estudiante y usuario' });
      return;
    }
    res.status(200).json(result);
  });
};

const obtenerTodosLosEstudiantes = (req, res) => {
  obtenerTodosEstudiantes((err, results) => {
    if (err) {
      console.error('Error al obtener elementos:', err);
      res.status(500).json({ message: 'Error al obtener elementos' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerEstudiantesConUsuarios = (req, res) => {
  obtenerEstudianteUsuario((err, results) => {
    if (err) {
      console.error('Error al obtener elementos:', err);
      res.status(500).json({ message: 'Error al obtener elementos' });
      return;
    }
    res.status(200).json(results);
  });
};

const obtenerEstudianteUsuarioConCod = (req, res) => {
  const estudianteCod = req.params.codigo;
  obtenerEstudianteUsuarioPorCod(estudianteCod, (err, result) => {
    if (err) {
      console.error('Error al obtener un estudiante:', err);
      res.status(500).json({ message: 'Error al obtener un estudiante' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    } else {
      res.status(200).json(result);
    }
  });
};

const obtenerEstudiantePorId = (req, res) => {
  const estudianteId = req.params.id;
  obtenerEstudiante(estudianteId, (err, result) => {
    if (err) {
      console.error('Error al obtener un estudiante:', err);
      res.status(500).json({ message: 'Error al obtener un estudiante' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    } else {
      const estudianteConId = { id: estudianteId, ...result };
      res.status(200).json(estudianteConId);
    }
  });
};

const actualizarEstudiantePorId = (req, res) => {
  const estudianteId = req.params.id;
  const estudianteActualizado = new Estudiante(req.body);
  actualizarEstudiante(estudianteId, estudianteActualizado, (err, result) => {
    if (err) {
      console.error('Error al actualizar un estudiante:', err);
      res.status(500).json({ message: 'Error al actualizar un estudiante' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    } else {
      res.status(200).json({ message: 'Estudiante actualizado correctamente' });
    }
  });
};

const eliminarEstudiantePorId = (req, res) => {
  const estudianteId = req.params.id;
  eliminarEstudiante(estudianteId, (err, result) => {
    if (err) {
      console.error('Error al eliminar un estudiante:', err);
      res.status(500).json({ message: 'Error al eliminar un estudiante' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    } else {
      res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    }
  });
};

module.exports = {
  crearNuevoEstudiante,
  obtenerTodosLosEstudiantes,
  obtenerEstudiantePorId,
  actualizarEstudiantePorId,
  eliminarEstudiantePorId,
  obtenerEstudiantesConUsuarios,
  obtenerEstudianteUsuarioConCod,
  crearNuevoEstudianteYUsuario,
  actualizarEstudianteYUsuario,
  eliminarEstudianteConUsuario
};
