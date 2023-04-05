require('dotenv').config({ path: './.env' });

// Necessary barebone imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

// Connect to the MongoDB Database
// uri needs to specify the database
mongoose.connect(uri);
const database = mongoose.connection;

database.on('error', (err) => {
  console.error(err);
});

database.once('connected', () => {
  console.log('Database connected!');
});

// Model imports
require('./models/testModel');

// Route imports
const eventRouter = require('./routes/eventRoutes');
const resourceRouter = require('./routes/resourceRoutes');
const testRouter = require('./routes/testRoutes');
const submissionRouter = require('./routes/submissionRoutes');
const userRouter = require('./routes/userRoutes');
const zineRouter = require('./routes/zineRoutes');

// Start the Node Express server
const app = express();
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// Use the api routes
app.use('/event', eventRouter);
app.use('/resource', resourceRouter);
app.use('/test', testRouter);
app.use('/submissions', submissionRouter);
app.use('/user', userRouter);
app.use('/zine', zineRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
