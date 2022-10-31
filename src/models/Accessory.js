const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const accessorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Accessory name must be at least 3 symbols long"],
    maxLength: [300, "Accessory name cannot be more than 300 symbols"],
  },
  price: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: true,
    minLength: [3, "Accessory Image url must be at least 3 symbols long"],
    maxLength: [2048, "Accessory Image url cannot be more than 2048 symbols"],
    match: [/^https?:\/\//, "Accessory Image URL must be a valid URL"],
  },
  description: {
    type: String,
    required: true,
    minLength: [5, "Accessory Description must be at least 3 symbols long"],
    maxLength: [
      4000,
      "Accessory Description, cannot be more than 4000 symbols",
    ],
  },
  cars: { type: [ObjectId], default: [], ref: "Car" },
  isDeleted: { type: Boolean, default: false },
});

const Accessory = model("Accessory", accessorySchema);

module.exports = Accessory;
