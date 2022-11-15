const mongoose = require('mongoose');
const Test = mongoose.model('Test');

// Example of creating a document in the database
const createTest = async (req, res) => {
    const test = new Test({
        name: 'James',
        age: 20
    });
    try {
        console.log('here');
        const data = await test.save(test);
        res.send('Get API');
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    createTest
}