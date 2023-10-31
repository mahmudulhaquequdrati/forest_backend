const express = require("express");
const {
  getAllInfo,
  addToMap,
  updateToMap,
} = require("../controllers/forestController");
const router = express.Router();

router.get("/forest", getAllInfo);
// get customers by search

router.post("/addToMap", addToMap);
router.put("/update/:id", updateToMap);

module.exports = router;
