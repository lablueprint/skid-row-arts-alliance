require('dotenv').config({ path: './.env' });

// Necessary imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('./utils/passportConfig');
const db = require('./utils/db');

const port = process.env.PORT;

// Route imports
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const artGalleryRouter = require('./routes/artGalleryRoutes');

// Start the Node Express server
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Initialize passport
app.use(passport.initialize());

db.connect();

// Use the api routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/artgallery', artGalleryRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
