const express = require("express");
const router = express.Router();
const path = require('path');


router.get("/api/auth/docs", async (req, res) => {
  // res.send("A")
  res.sendFile(path.join(process.cwd() + '\\src\\docs\\output.html'));
});

module.exports = router;
