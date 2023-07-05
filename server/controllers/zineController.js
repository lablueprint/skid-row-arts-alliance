const Zine = require('../models/zineModel');

const createZine = async (req, res) => {
  const zine = new Zine(req.body);
  try {
    const data = await zine.save(zine);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const updateZine = async (req, res) => {
  try {
    const data = await Zine.findByIdAndUpdate(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

const getAllZines = async (req, res) => {
  try {
    const data = await Zine.find();
    res.send(data);
  } catch (err) {
    console.error(err);
  }
};

const getSpecificZine = async (req, res) => {
  try {
    const data = await Zine.findById(req.params.id);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

const getZineURL = async (req, res) => {
  try {
    const data = await Zine.find({ url: req.params.url }, 'url');
    if (data.length === 0) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteZine = async (req, res) => {
  try {
    const data = await Zine.findByIdAndRemove(req.params.id);
    res.json({
      msg: data,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createZine,
  getAllZines,
  updateZine,
  deleteZine,
  getSpecificZine,
  getZineURL,
};
