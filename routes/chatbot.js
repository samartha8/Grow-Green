const express = require("express");
const router = express.Router();
const { askChori } = require("../controllers/chatbotController");

router.post("/", askChori);

module.exports = router;
