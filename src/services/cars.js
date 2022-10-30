const Car = require("../models/Car");

function carViewModel(car) {
  return {
    id: car._id,
    name: car.name,
    price: car.price,
    imageUrl: car.imageUrl,
    description: car.description,
  };
}

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
  const car = await Car.findById(id).where({ isDeleted: false });

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
    await Car.deleteOne({ _id: id }).where({ isDeleted: false });
  } catch (error) {
    console.error(`Error while deleting car with ${id} id.`, error);
    process.exit(1);
  }
}

async function editById(id, newCar) {
  try {
    await Car.findByIdAndUpdate(id, newCar).where({ isDeleted: false });
  } catch (error) {
    console.error(`Error while editing car with ${id} id.`, error);
    process.exit(1);
  }
}

module.exports = () => (req, res, next) => {
  req.storage = {
    getAll,
    getById,
    createCar,
    deleteById,
    editById,
  };

  next();
};
