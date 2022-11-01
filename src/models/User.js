const { Schema, model } = require("mongoose");
const { hashPassword, comparePassword } = require("../services/utils");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: [5, "Username must be at least 5 symbols long."],
  },
  hashedPassword: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 symbols long."],
  },
});

userSchema.index(
  { username: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

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
