const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((error) => {
  console.error('❌ Error conectando a MongoDB Atlas:', error);
  process.exit(1);
});

module.exports = mongoose;