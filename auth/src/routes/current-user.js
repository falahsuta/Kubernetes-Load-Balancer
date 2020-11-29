const express = require("express");
const router = express.Router();
const currUserMiddleware = require("../middlewares/current-user");

router.get("/api/users/currentUser", currUserMiddleware, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

module.exports = router;
