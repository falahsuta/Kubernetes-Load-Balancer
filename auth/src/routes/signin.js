const express = require("express");
require("express-async-errors");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const common_path = "../../../common";
const { ValidationError } = require(common_path +
  "/errors/request-validation-error");
const { BadRequestError } = require(common_path + "/errors/bad-request-error");
const Password = require("../services/password");
const User = require("../models/User");

router.post(
  "/api/users/signin",
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

    const { username, password } = req.body;
    const isUserExist = await User.findOne({ username });
    if (!isUserExist) {
      throw new BadRequestError("Credentials are invalid");
    }

    const isPasswordMatch = await Password.verify(
      password,
      isUserExist.password
    );
    if (!isPasswordMatch) {
      throw new BadRequestError("Credentials are invalid");
    }

    req.session = {
      jwt: jwt.sign(
        {
          id: isUserExist.id,
          username: isUserExist.username,
        },
        "key"
      ),
    };

    res.status(200).send(isUserExist);
  }
);

// router.post("/api/users/info", async (req, res) => {
//   console.log(req.body.userId);
//   const user = await User.findById(req.body.userId);

//   if (!user) {
//     throw new BadRequestError("No users");
//   }

//   res.send(user);

// });

module.exports = router;
