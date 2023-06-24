const Event = require('../models/eventModel');

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
    // S3 Key retrieval from MongoDB
    // Empty `filter` means "match all documents"
    const filter = {};
    const allEvents = await Event.find(filter);

    // TODO: replace AWS thumbnails with hardcoded defaults
    res.send(allEvents);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const updateEvent = async (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
};

const deleteEvent = async (req, res) => {
  Event.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      res.json({
        msg: data,
      });
    }
  });
};

module.exports = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
