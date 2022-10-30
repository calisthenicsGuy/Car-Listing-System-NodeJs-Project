const mongoose = require("mongoose");

const carSechema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  imageUrl: { type: String },
  description: { type: String },
});

const Car = mongoose.model("Car", carSechema);

module.exports = Car;
