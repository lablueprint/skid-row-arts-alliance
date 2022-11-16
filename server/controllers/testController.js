const mongoose = require('mongoose');

const Test = mongoose.model('Test');

// Example of creating a document in the database
const createTest = async (req, res) => {
  const test = new Test(req.body);
  try {
    const data = await test.save(test);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createTest,
};
