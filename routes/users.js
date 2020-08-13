const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send("hello world users get");
});

router.post("/", async (req, res, next) => {
  res.send("hello world users post");
});

router.get("/add", async (req, res, next) => {
  res.send("hello world user add");
});

module.exports = router;
