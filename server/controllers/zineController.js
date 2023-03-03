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
