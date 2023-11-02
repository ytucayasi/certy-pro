const express = require('express');
const usuarioRouter = require('./routes/usuarioRouter.js');
const documentoRouter = require('./routes/documentoRouter.js');
const insRouter = require('./routes/insRouter.js');
const estudianteRouter = require('./routes/estudianteRouter.js');
const certificadoRouter = require('./routes/certificadoRouter.js');
const nivelAcademicoRouter = require('./routes/nivelAcademicoRouter.js');
const app = express();

// Configurar encabezados de seguridad
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

// Manejar errores de forma segura
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.use(express.json());
app.use('/api', usuarioRouter);
app.use('/api', documentoRouter);
app.use('/api', insRouter);
app.use('/api', estudianteRouter);
app.use('/api', certificadoRouter);
app.use('/api', nivelAcademicoRouter);
module.exports = app;