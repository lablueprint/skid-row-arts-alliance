const mongoose = require('mongoose');

const Event = mongoose.model('Event');

// Example of creating a document in the database
const createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    const data = await event.save(event);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const data = await Event.find();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
};
