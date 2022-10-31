const Accessory = require("../models/Accessory");

const { accessoryViewModel } = require("./utils");

async function createAccessory(accessory) {
  const newAccessory = new Accessory(accessory);
  await newAccessory.save();
}

async function getAll() {
  const data = await Accessory.find({}).where({ isDeleted: false });
  return data.map(accessoryViewModel);
}

async function deleteAccessoryById(id) {
  const accessory = await Accessory.findById(id);
  accessory.isDeleted = true;
  accessory.save();
}

async function getById(id) {
  const accessory = await Accessory.findById(id);
  return accessoryViewModel(accessory);
}

async function attachCar(accessoryId, carId) {
  const accessory = await Accessory.findById(accessoryId);
  accessory.cars.push(carId);
  accessory.save();
}

module.exports = () => (req, res, next) => {
  req.accessory = {
    createAccessory,
    getAll,
    getById,
    deleteAccessoryById,
    attachCar,
  };

  next();
};
