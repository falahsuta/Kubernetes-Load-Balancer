const express = require("express");
const router = express.Router();
const path = require('path');


router.get("/api/users/docs", async (req, res) => {
  res.sendFile(path.join(process.cwd() + '/src/docs/user.html'));
});

module.exports = router;
