const AWS = require('aws-sdk');
const Event = require('../models/eventModel');

// Connect to the AWS S3 Storage
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

// Example of creating a document in the database
const createEvent = async (req, res) => {
  const { newEvent } = req.body;
  const eventData = JSON.parse(newEvent);

  // Handle uploaded images
  const { files } = req;
  const images = [];
  if (files) {
    try {
      await Promise.all(
        // Upload the images to S3 and add their keys to the images array
        files.map(async (file) => {
          const imageKey = `EventImages/${file.originalname}`;
          await s3.upload({
            Bucket: process.env.S3_BUCKET,
            Key: imageKey,
            ContentType: file.mimetype,
            Body: file.buffer,
          }).promise();
          images.push(imageKey);
        }),
      );
    } catch (err) {
      res.status(err.statusCode ? err.statusCode : 400);
      res.send(err);
    }
    eventData.images = images;
  }

  // Create a new event with the data and potential images
  const event = new Event(eventData);
  try {
    const data = await event.save(event);
    res.send(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const getAllEvents = async (req, res) => {
  try {
    // S3 Key retrieval from MongoDB
    // Empty `filter` means "match all documents"
    const filter = {};
    const events = await Event.find(filter);

    const allEvents = await Promise.all(
      events.map(async (event) => {
        const updatedImages = await Promise.all(
          event.images.map(async (imageKey) => `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${imageKey}`),
        );
        return {
          ...event.toObject(),
          imageUrls: updatedImages,
        };
      }),
    );
    res.send(allEvents);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const updateEvent = async (req, res) => {
  const { updatedEvent } = req.body;
  const eventData = JSON.parse(updatedEvent);

  const { files } = req;
  const updatedImageKeys = files.map((file) => `EventImages/${file.originalname}`);
  // Updated image keys that should appear in MongoDB and S3
  const updatedImages = [...eventData.images, ...updatedImageKeys];

  eventData.images = updatedImages;
  try {
    // Add the updated event details to the MongoDB document
    const response = await Event.findByIdAndUpdate(req.params.id, eventData, { new: false });
    // Original image keys that should be replaced
    const originalImages = [...response.images];

    // Delete the image keys that were removed from the original
    const toDelete = originalImages.filter((imageKey) => !updatedImages.includes(imageKey));
    await Promise.all(toDelete.map(async (key) => {
      await s3.deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: key,
      }).promise();
    }));

    // Add the image files that were added from the original
    files.forEach(async (file) => {
      const imageKey = `EventImages/${file.originalname}`;
      await s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: imageKey,
        ContentType: file.mimetype,
        Body: file.buffer,
      }).promise();
    });

    res.send(eventData);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const response = await Event.findByIdAndRemove(req.params.id, { new: true });
    await Promise.all(response.images.map(async (key) => {
      await s3.deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: key,
      }).promise();
    }));
    res.send(response);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
