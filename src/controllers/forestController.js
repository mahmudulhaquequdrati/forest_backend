const Forest = require("../models/ForestInfo");

const getAllInfo = async (req, res) => {
  try {
    const results = await Forest.find().exec();

    res.status(200).json({
      message: "All INfo",
      data: results,
    });
  } catch (err) {
    res.status(403).json({
      errorMessage: "There was a problem getting the forest Info",
      error: err.message,
    });
  }
};

const addToMap = async (req, res) => {
  try {
    console.log(req.body);
    const forest_info = new Forest(req.body);
    const info = await forest_info.save();
    res.status(200).json({
      message: "New Info Added To map successfully",
      data: info,
    });
  } catch (err) {
    res.status(403).json({
      errorMessage: "There was a problem adding info to the map",
      error: err.message,
    });
  }
};
const updateToMap = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const options = { new: true };
    const updatedInfo = await Forest.findByIdAndUpdate(id, updates, options);
    res.status(200).json({
      message: "Info updated successfully",
      data: updatedInfo,
    });
  } catch (err) {
    res.status(403).json({
      errorMessage: "There was a problem adding info to the map",
      error: err.message,
    });
  }
};

module.exports = {
  getAllInfo,
  addToMap,
  updateToMap,
};
