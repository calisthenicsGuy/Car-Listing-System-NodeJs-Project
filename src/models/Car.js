const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const carSechema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Car listing name must be at least 3 symbols long"],
    maxLength: [300, "Car listing name cannot be more than 300 symbols"],
  },
  price: {
    type: Number,
    required: true,
    min: [100, "Car Price cannot be lower than 100 BGN"],
  },
  imageUrl: {
    type: String,
    required: true,
    minLength: [3, "Car Image url must be at least 3 symbols long"],
    maxLength: [2048, "Car Image url cannot be more than 2048 symbols"],
    match: [/^https?:\/\//, "Car Image URL must be a valid URL"],
  },
  description: {
    type: String,
    required: true,
    minLength: [5, "Car Description must be at least 3 symbols long"],
    maxLength: [8000, "Car Description, cannot be more than 8000 symbols"],
  },
  accessories: { type: [ObjectId], default: [], ref: "Accessory" },
  isDeleted: { type: Boolean, default: false },
});

const Car = model("Car", carSechema);

module.exports = Car;
