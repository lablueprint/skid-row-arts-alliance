const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT;
const routes = require('./routes');
const connectToDatabase = require('./db');

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

connectToDatabase((db) => {
    routes(app, db).listen(port, (err) => {
        if (err) {
            console.error(err);
        }
        console.log(`Listening on port ${port}`);
    })
});
