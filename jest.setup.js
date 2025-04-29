const { MongoMemoryReplSet } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let replSet;

module.exports = async () => {
  replSet = await MongoMemoryReplSet.create({
    replSet: { count: 1 },
  });
  const uri = replSet.getUri();

  process.env.MONGO_URI = uri;

  await mongoose.connect(uri);
  console.log('✅ Conectado a MongoDB Memory Server para pruebas');
};