const express = require("express");
const router = express.Router();
const path = require('path');


router.get("/api/auth/docs", async (req, res) => {
  res.sendFile(path.join(process.cwd() + '/src/docs/auth.html'));
});

module.exports = router;
