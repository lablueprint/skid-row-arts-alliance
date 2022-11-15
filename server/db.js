const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase(callback) {
    try {
        const databases = await client.connect()
        const db = databases.db('test');
        console.log("Connected to MongoDB");
        return callback(db);
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = connectToDatabase;