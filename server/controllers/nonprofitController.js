const Nonprofit = require('../models/nonprofitModel');

const addNonprofit = async (req, res) => {
  const nonprofit = new Nonprofit(req.body);
  try {
    const data = await nonprofit.save(nonprofit);
    res.send(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const updateNonprofit = async (req, res) => {
  try {
    const data = await Nonprofit.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const getAllNonprofits = async (_, res) => {
  try {
    const allNonprofits = await Nonprofit.find();
    res.send(allNonprofits);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const getNonprofit = async (req, res) => {
  try {
    const data = await Nonprofit.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

const deleteNonprofit = async (req, res) => {
  try {
    const data = await Nonprofit.findByIdAndRemove(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(err.statusCode ? err.statusCode : 400);
    res.send(err);
  }
};

module.exports = {
  addNonprofit,
  updateNonprofit,
  getAllNonprofits,
  getNonprofit,
  deleteNonprofit,
};
