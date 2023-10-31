const mongoose = require("mongoose");
const ForestIno = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String || Number,
      required: true,
    },
    address: {
      latitude: Number,
      longitude: Number,
      add: String,
    },
    reportType: [String],
    img: String,
    video: String,
    date: String,
    status: {
      type: String,
      default: "unsolved",
    },
    approve: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Forest = mongoose.model("ForestIno", ForestIno);

module.exports = Forest;
