require('dotenv').config({ path: './.env' });

// Necessary imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./utils/passportConfig');
const db = require('./utils/db');

const port = process.env.PORT;

// Route imports
const authRouter = require('./routes/authRoutes');
const eventRouter = require('./routes/eventRoutes');
const resourceRouter = require('./routes/resourceRoutes');
const submissionRouter = require('./routes/submissionRoutes');
const userRouter = require('./routes/userRoutes');
const zineRouter = require('./routes/zineRoutes');

// Start the Node Express server
const app = express();
app.use(cors());
app.use(helmet());
// app.use(express.json());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Initialize passport
app.use(passport.initialize());

db.connect();



// Use the api routes
app.use('/auth', authRouter);
app.use('/event', eventRouter);
app.use('/resource', resourceRouter);
app.use('/submissions', submissionRouter);
app.use('/user', userRouter);
app.use('/zine', zineRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
