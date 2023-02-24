const Resource = require('../models/resourcesModel');

const createResource = async (req, res) => {
  const resource = new Resource(req.body);
  try {
    const data = await resource.save(resource);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const updateResource = async (req, res) => {
  Resource.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
};

const getAllResources = async (req, res) => {
  try {
    const data = await Resource.find();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const deleteResource = async (req, res) => {
  Resource.findByIdAndRemove(req.params.id, (error, data) => {
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
  createResource,
  getAllResources,
  updateResource,
  deleteResource,
};
