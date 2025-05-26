module.exports = async () => {
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('✅ Conexión a MongoDB cerrada correctamente.');
  }
};
