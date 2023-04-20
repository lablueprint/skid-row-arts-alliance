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
    // S3 Key retrieval from MongoDB
    // Empty `filter` means "match all documents"
    const filter = {};
    const allResources = await Resource.find(filter);

    // TODO: remove default thumbnail in the future
    const thumbnailKeys = allResources.map((resource) => (resource.thumbnail ? resource.thumbnail : '0001Bulbasaur.png'));
    // Reformat data for response
    const responseList = thumbnailKeys.map((key, idx) => ({
      ResourceData: allResources[idx],
      ImageURL: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/MapCards/${key}`,
    }));
    res.send(responseList);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
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
