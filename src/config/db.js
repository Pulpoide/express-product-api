const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let mongoURI;

const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV.trim().toLowerCase() : '';

if (nodeEnv === 'test') {
  mongoURI = process.env.MONGO_URI;
} else if (nodeEnv === 'development') {
  mongoURI = process.env.MONGO_URI_DEV;
} else if (nodeEnv === 'production') {
  mongoURI = process.env.MONGO_URI;
} else {
  throw new Error(
    `❌ NODE_ENV no está configurado correctamente. Valor recibido: "${process.env.NODE_ENV}"`
  );
}

mongoose
  .connect(mongoURI)
  .then(() => console.log(`✅ Conectado a MongoDB Atlas`))
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  });

module.exports = mongoose;
