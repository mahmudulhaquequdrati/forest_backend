const upload = require("../middleware/fileUpload");
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

// const addToMap = async (req, res) => {
//   try {
//     const forest_info = new Forest(req.body);
//     const info = await forest_info.save();
//     res.status(200).json({
//       message: "New Info Added To map successfully",
//       data: info,
//     });
//   } catch (err) {
//     res.status(403).json({
//       errorMessage: "There was a problem adding info to the map",
//       error: err.message,
//     });
//   }
// };
const addToMap = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        errorMessage: "File upload failed",
        error: err.message,
      });
    }
    console.log(req.body);
    try {
      const file = req.file;
      const isImage = file.mimetype.startsWith("image/");
      const isVideo = file.mimetype.startsWith("video/");

      let address = {
        latitude: req.body?.latitude,
        longitude: req.body?.longitude,
        add: req.body?.address,
      };

      if (isImage) {
        const forest_info = new Forest({
          ...req.body,
          address: address,
          img: req.file.path,
          video: "",
        });
        const info = await forest_info.save();
        res.status(200).json({
          message: "New Info Added To map successfully",
          data: info,
        });
      } else if (isVideo) {
        const forest_info = new Forest({
          ...req.body,
          address: address,
          img: "",
          video: req.file.path,
        });
        const info = await forest_info.save();
        res.status(200).json({
          message: "New Info Added To map successfully",
          data: info,
        });
      }
    } catch (err) {
      res.status(403).json({
        errorMessage: "There was a problem adding info to the map",
        error: err.message,
      });
    }
  });
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
