const Resource = require('../models/resourceModel');

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
  try {
    const data = await Resource.findByIdAndUpdate(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
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
  try {
    const data = await Resource.findByIdAndRemove(req.params.id);
    res.json({ msg: data });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createResource,
  getAllResources,
  updateResource,
  deleteResource,
};
