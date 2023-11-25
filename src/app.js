const express = require('express');
const cors = require('cors');
const usuarioRouter = require('./routes/usuarioRouter.js');
const documentoRouter = require('./routes/documentoRouter.js');
const insRouter = require('./routes/insRouter.js');
const estudianteRouter = require('./routes/estudianteRouter.js');
const certificadoRouter = require('./routes/certificadoRouter.js');
const nivelAcademicoRouter = require('./routes/nivelAcademicoRouter.js');
const privilegioRouter = require('./routes/privilegioRouter.js');
const rolRouter = require('./routes/rolRouter.js');
const prRouter = require('./routes/prRouter.js');
const ruRouter = require('./routes/ruRouter.js');
const documentoCopiaRouter = require('./routes/documentoCopiaRouter.js');
const planEstudioRouter = require('./routes/planEstudioRouter.js');
const peeRouter = require('./routes/peeRouter.js');
const programaEstudioRouter = require('./routes/programaEstudioRouter.js');
const unidadCompetenciaRouter = require('./routes/unidadCompetenciaRouter.js');
const moduloFormativoRouter = require('./routes/moduloFormativoRouter.js');
const unidadDidacticaRouter = require('./routes/unidadDidacticaRouter.js');
const periodoRouter = require('./routes/periodoRouter.js');
const pepeRouter = require('./routes/pepeRouter.js');
const pemfRouter = require('./routes/pemfRouter.js');
const ucudRouter = require('./routes/ucudRouter.js');
const mfucRouter = require('./routes/mfucRouter.js');
const udpRouter = require('./routes/udpRouter.js');
const app = express();

app.use(cors());

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
app.use('/api', privilegioRouter);
app.use('/api', rolRouter);
app.use('/api', prRouter);
app.use('/api', ruRouter);
app.use('/api', documentoCopiaRouter);
app.use('/api', planEstudioRouter);
app.use('/api', peeRouter);
app.use('/api', programaEstudioRouter);
app.use('/api', unidadCompetenciaRouter);
app.use('/api', moduloFormativoRouter);
app.use('/api', unidadDidacticaRouter);
app.use('/api', periodoRouter);
app.use('/api', pepeRouter);
app.use('/api', ucudRouter);
app.use('/api', mfucRouter);
app.use('/api', pemfRouter);
app.use('/api', udpRouter);


module.exports = app;