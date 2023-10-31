const express = require("express");
const { getAllInfo, addToMap } = require("../controllers/forestController");
const router = express.Router();

router.get("/forest", getAllInfo);
// get customers by search

router.post("/addToMap", addToMap);

module.exports = router;
