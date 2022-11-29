// Necessary barebone imports
require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

// Connect to the MongoDB Database
// uri needs to specify the database
// mongoose.connect(uri);
// const database = mongoose.connection;

// database.on('error', (err) => {
//   console.error(err);
// });

// database.once('connected', () => {
//   console.log('Database connected!');
// });

// Model imports
// require('./models/testModel');

// Route imports
// const testRouter = require('./routes/testRoutes');
const awsRouter = require('./routes/awsRoutes');

// Setup the Node Server
const app = express();
app.use(cors());
app.use(express.json());

// Use the API routes
// app.use('/test', testRouter);
app.use('/aws', awsRouter);

// Start the Node Server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
