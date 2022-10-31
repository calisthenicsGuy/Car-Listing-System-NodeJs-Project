const User = require("../models/User");

async function register(username, password) {
  const newUser = {
    username,
    hashedPassword: password,
  };

  const user = new User(newUser);
  await user.save();
}

module.exports = () => (req, res, next) => {
  req.auth = {
    register,
  };

  next();
};
