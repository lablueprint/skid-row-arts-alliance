const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

// Connect to MongoDB database
const connect = () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', (err) => {
    console.error(err);
  });

  db.once('connected', () => {
    console.log('Database connected!');
  });

  return db.getClient();
};

module.exports = { connect };
