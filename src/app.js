const express = require('express');
const usuarioRouter = require('./routes/usuarioRouter.js');
const documentoRouter = require('./routes/documentoRouter.js');
const insRouter = require('./routes/insRouter.js');
const estudianteRouter = require('./routes/estudianteRouter.js');
const certificadoRouter = require('./routes/certificadoRouter.js');

const app = express();


app.use(express.json());

app.use('/api', usuarioRouter);
app.use('/api', documentoRouter);
app.use('/api', insRouter);
app.use('/api', estudianteRouter);
app.use('/api', certificadoRouter);

module.exports = app;