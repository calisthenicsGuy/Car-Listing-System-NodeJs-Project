const { Schema, model } = require("mongoose");
const { hashPassword, comparePassword } = require("../services/utils");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, "Username must be at least 3 symbols."],
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    // minLength: [5, "Password must be at least 5 symbols."],
  },
});

userSchema.methods.comparePassword = async function (password) {
  return await comparePassword(password, this.hashedPassword);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("hashedPassword")) {
    this.hashedPassword = await hashPassword(this.hashedPassword);
  }

  next();
});

const User = model("User", userSchema);

module.exports = User;
