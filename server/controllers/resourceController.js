const Resource = require('../models/resourceModel');

const createResource = async (req, res) => {
  const resource = new Resource(req.body);
  try {
    const data = await resource.save(resource);
    res.send(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const updateResource = async (req, res) => {
  try {
    const data = await Resource.findByIdAndUpdate(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const getAllResources = async (req, res) => {
  try {
    const allResources = await Resource.find();
    res.send(allResources);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const deleteResource = async (req, res) => {
  try {
    const data = await Resource.findByIdAndRemove(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

module.exports = {
  createResource,
  getAllResources,
  updateResource,
  deleteResource,
};
