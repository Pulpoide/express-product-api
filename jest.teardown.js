const mongoose = require('mongoose');

module.exports = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('✅ Conexión a MongoDB cerrada correctamente.');
  }
};