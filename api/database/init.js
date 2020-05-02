exports.init = () => {
  const mongoose = require('mongoose');

  const { DB_URL, DB_NAME} = process.env

  const mongoDB = `mongodb://${DB_URL}/${DB_NAME}`;
  
  mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
  mongoose.set('useFindAndModify', false);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
