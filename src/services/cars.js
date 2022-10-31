const Car = require("../models/Car");

const { carViewModel } = require("./utils");

async function getAll(searchTerms = {}) {
  const options = { isDeleted: false };

  if (searchTerms.search) {
    options.name = new RegExp(searchTerms.search, "i");
  }
  if (searchTerms.from) {
    options.price = { $gte: Number(searchTerms.from) };
  }
  if (searchTerms.to) {
    options.price
      ? (options.price.$lte = Number(searchTerms.to))
      : (options.price = { $lte: Number(searchTerms.to) });
  }

  const cars = await Car.find(options);
  return cars.map(carViewModel);
  // return cars.map((car) => carViewModel(car));
}

async function getById(id) {
  const car = await Car.findById(id)
    .where({ isDeleted: false })
    .populate("accessories");

  if (car) {
    return carViewModel(car);
  } else {
    return undefined;
  }
}

async function createCar(car) {
  const newCar = new Car(car);
  await newCar.save();
}

async function deleteById(id) {
  try {
    const car = await Car.findById(id);
    car.isDeleted = true;
    car.save();
  } catch (error) {
    console.error(`Error while deleting car with ${id} id.`, error.message);
    process.exit(1);
  }
}

async function editById(id, newCar) {
  const car = await Car.findById(id).where({ isDeleted: false });
  car.name = newCar.name;
  car.price = newCar.price;
  car.imageUrl = newCar.imageUrl;
  car.description = newCar.description;
  car.accessories = newCar.accessories;

  await car.save();
}

async function attachAccessory(carId, accessoryId) {
  const car = await Car.findById(carId);

  car.accessories.push(accessoryId);
  await car.save();
}

async function getAccessoriesForCar(carId) {
  const car = await Car.findById(carId);

  return car.accessories;
}

module.exports = () => (req, res, next) => {
  req.storage = {
    getAll,
    getById,
    createCar,
    deleteById,
    editById,
    attachAccessory,
  };

  next();
};
