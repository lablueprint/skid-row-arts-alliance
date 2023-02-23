require('dotenv').config({ path: './.env' });

// Necessary barebone imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// Connect to the MongoDB Database
const db = require('./db');

const port = process.env.PORT;

// Route imports
const eventRouter = require('./routes/userRoutes');
const artGalleryRouter = require('./routes/artGalleryRoutes');

// Start the Node Express server
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Establish the session with mongoose
app.use(session({
  secret: 'example XD',
  store: new MongoStore({
    client: db.connect(),
  }),
  resave: false,
  saveUninitialized: false,
}));

// Use the api routes
app.use('/user', eventRouter);
app.use('/artgallery', artGalleryRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
