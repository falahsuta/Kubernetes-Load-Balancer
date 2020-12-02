const express = require("express");
const router = express.Router();
const currUserMiddleware = require("../helpers/middlewares/current-user");

router.get("/api/auth/currentUser", currUserMiddleware, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

module.exports = router;
