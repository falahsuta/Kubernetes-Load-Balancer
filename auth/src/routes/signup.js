const express = require("express");
require("express-async-errors");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const common_path = "../helpers";
const { ValidationError } = require(common_path +
  "/errors/request-validation-error");
const { BadRequestError } = require(common_path + "/errors/bad-request-error");
const User = require("../models/User");

router.post(
  "/api/auth/signup",
  [
    body("username").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 8 and 20 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { username, password, role } = req.body;

    const serverApiKey = "test"; // or use .env variable 

    if (role === 1) {
      const { apiKey } = req.body;
      if (apiKey !== serverApiKey) {
        throw new BadRequestError("Credentials are invalid")
      }
    }

    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
      throw new BadRequestError("email has already been use");
    }

    const user = User({ username, password, role });
    await user.save();

    // JWT save in to cookie-session
    req.session = {
      jwt: jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role
        },
        "key"
      ),
    };

    res.status(201).send(user);
  }
);

module.exports = router;
