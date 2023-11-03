// jest.config.js
module.exports = {
  // Otras configuraciones de Jest...

  // Antes de cargar las pruebas, carga las variables de entorno desde el archivo .env
  setupFiles: ['dotenv/config'],
};