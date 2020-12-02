const mongoose = require("mongoose");
const Password = require("../services/password");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: Number
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
    }
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashed = await Password.hash(this.get("password"));
    this.set("password", hashed);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
