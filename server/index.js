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
const eventRouter = require('./routes/eventRoutes');
const passwordResetRouter = require('./routes/passwordResetRoutes');
const resourceRouter = require('./routes/resourceRoutes');
const submissionRouter = require('./routes/submissionRoutes');
const userRouter = require('./routes/userRoutes');

// Start the Node Express server
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Initialize passport
app.use(passport.initialize());

db.connect();

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// Use the api routes
app.use('/auth', authRouter);
app.use('/event', eventRouter);
app.use('/passwordReset', passwordResetRouter);
app.use('/resource', resourceRouter);
app.use('/submissions', submissionRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
