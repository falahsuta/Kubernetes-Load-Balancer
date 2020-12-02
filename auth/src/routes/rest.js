const express = require("express");
const router = express.Router();
const User = require("../models/User");
const currUserMiddleware = require("../middlewares/current-user");
const { body, validationResult } = require("express-validator");

const common_path = "../helpers";
const { NotAuthorizedError } = require(common_path +
  "/errors/not-authorized-error");
const { ValidationError } = require(common_path +
  "/errors/request-validation-error");
const { BadRequestError } = require(common_path + "/errors/bad-request-error");

// Admin role can CREATE
router.post("/api/users", [
  body("username").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),
], currUserMiddleware, async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }

  const { username, password } = req.body;

  const isUserExist = await User.findOne({ username });
  if (isUserExist) {
    throw new BadRequestError("email has already been use");
  }

  if (req.currentUser && req.currentUser.role === 1) {
    const user = User({ username, password, role: 0 });

    await user.save();

    res.status(201).send(user);
  } else {
    throw new NotAuthorizedError();
  }
})

// Admin role can READ
router.get("/api/users", currUserMiddleware, async (req, res) => {
  if (req.currentUser && req.currentUser.role === 1) {
    // if query was spesificied in request
    if (req.query.id) {
      const user = await User.findById(req.query.id);

      return res.status(200).send(user);
    }

    // if not find all
    const user = await User.find({});

    return res.status(200).send(user);

  } else {
    throw new NotAuthorizedError();
  }

});

// Admin role can UPDATE
router.put("/api/users/:id", currUserMiddleware, async (req, res) => {
  if (req.currentUser && req.currentUser.role === 1) {
    const user = await User.findById(req.params.id);

    if (req.body.username) {
      const isUserExist = await User.findOne({ username: req.body.username });
      if (isUserExist) {
        throw new BadRequestError("email has already been use");
      }
    }

    if (req.body.role && req.body.role == 1) {
      throw new NotAuthorizedError();
    }

    user.set({
      ...req.body
    })

    await user.save();

    return res.status(200).send(user);
  } else {
    throw new NotAuthorizedError();
  }
});

// Admin role can DELETE
router.delete("/api/users", currUserMiddleware, async (req, res) => {
  if (req.currentUser && req.currentUser.role === 1) {
    const user = await User.deleteOne({ _id: req.query.id });
    res.send({ user });
  } else {
    throw new NotAuthorizedError();
  }
});


module.exports = router;
