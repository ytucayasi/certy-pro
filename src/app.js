const express = require('express');
const usuarioRouter = require('./routes/usuarioRouter.js');
const documentoRouter = require('./routes/documentoRouter.js');

const app = express();


app.use(express.json());

app.use('/api', usuarioRouter);
app.use('/api', documentoRouter);

module.exports = app;