const sql_connect = require('../config/db.js');

async function crearPEPE(pepe, callback) {
  try {
    const db = await sql_connect();
    const { plan_estudio_id, programa_estudio_id } = pepe;
    const query = 'INSERT INTO pepe (plan_estudio_id, programa_estudio_id) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [plan_estudio_id, programa_estudio_id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

const obtenerProgramasPorPlan = async (planEstudioId) => {
  try {
    const db = await sql_connect();

    // Obtener información de la relación plan y programas usando INNER JOIN
    const query = `
      SELECT pepe.id, pepe.plan_estudio_id, pepe.programa_estudio_id, pepe.estado, programa_estudio.*
      FROM pepe
      INNER JOIN programa_estudio ON pepe.programa_estudio_id = programa_estudio.id
      WHERE pepe.plan_estudio_id = ?;
    `;
    
    const [results] = await db.promise().query(query, [planEstudioId]);

    await db.end();

    if (results.length === 0) {
      throw new Error('No se encontraron programas de estudio para el plan');
    }

    return {
      plan_estudio: {
        id: results[0].plan_estudio_id,
        // Otros campos del plan_estudio que desees incluir
      },
      programas_estudio: results.map(programa => ({
        id: programa.id,
        nombre: programa.nombre,
        estado: programa.estado,
        // Otros campos del programa_estudio que desees incluir
      })),
    };
  } catch (err) {
    throw err; // Puedes manejar este error según tus necesidades
  }
};

const obtenerEstadoYNombreDelPrograma = async (programaId) => {
  try {
    const db = await sql_connect();

    const query = `
      SELECT pepe.estado, programa_estudio.id AS programa_id, programa_estudio.nombre AS programa_nombre
      FROM pepe
      INNER JOIN programa_estudio ON pepe.programa_estudio_id = programa_estudio.id
      WHERE pepe.programa_estudio_id = ?;
    `;
    
    const [results] = await db.promise().query(query, [programaId]);

    console.log(results);

    await db.end();

    if (results.length === 0) {
      throw new Error('No se encontró información para el programa con el ID proporcionado');
    }

    const programa = results[0];

    return {
      estado: programa.estado,
      programa: {
        id: programa.programa_id,
        nombre: programa.programa_nombre,
        // Otros campos del programa_estudio que desees incluir
      }
    };
  } catch (err) {
    throw err;
  }
};

async function obtenerTodosPEPE(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM pepe';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerPEPE(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM pepe WHERE id = ?';
    const [results] = await db.promise().query(query, [id]);
    await db.end();

    if (results.length === 0) {
      callback(null, null);
    } else {
      callback(null, results[0]);
    }
  } catch (err) {
    callback(err, null);
  }
}

async function actualizarPEPE(pepe, callback) {
  try {
    const db = await sql_connect();
    const { id, plan_estudio_id, programa_estudio_id } = pepe;
    const query = 'UPDATE pepe SET plan_estudio_id = ?, programa_estudio_id = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [plan_estudio_id, programa_estudio_id, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarPEPE(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM pepe WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearPEPE,
  obtenerTodosPEPE,
  obtenerPEPE,
  actualizarPEPE,
  eliminarPEPE,
  obtenerProgramasPorPlan,
  obtenerEstadoYNombreDelPrograma
};
