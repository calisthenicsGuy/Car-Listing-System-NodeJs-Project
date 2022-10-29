const fs = require("fs/promises");

const FILE_PATH = "./services/data.json";

async function read() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Database read error.");
    console.error(error);
    process.exit(1);
  }
}

async function write(data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(FILE_PATH, jsonData);
  } catch (error) {
    console.error("Database write error.");
    console.error(error);
    process.exit(1);
  }
}

async function getAll(searchTerms = {}) {
  const data = await read();

  let cars = Object.entries(data).map(([id, value]) =>
    Object.assign({}, { id }, value)
  );

  if (searchTerms.search) {
    cars = cars.filter((car) =>
      car.name
        .toLowerCase()
        .includes(
          searchTerms.search.toLowerCase() ||
            car.description
              .toLowerCase()
              .includes(searchTerms.search.toLowerCase())
        )
    );
  }
  if (searchTerms.from) {
    cars = cars.filter((car) => Number(car.price) >= Number(searchTerms.from));
  }
  if (searchTerms.to) {
    cars = cars.filter((car) => Number(car.price) <= Number(searchTerms.to));
  }

  return cars;
}

async function getById(id) {
  const cars = await getAll();
  const targetCar = cars.find((car) => car["id"] == id);

  if (targetCar) {
    return targetCar;
  } else {
    return undefined;
  }
  //   const cars = await read();
  //   const targetCas = Object.assign({}, {id}, cars[id])
}

async function createCar(car) {
  const cars = await read();

  let id;
  do {
    id = nextId();
  } while (cars.hasOwnProperty(id));

  cars[id] = car;

  await write(cars);
}

async function deleteById(id) {
  const cars = await read();

  if (cars.hasOwnProperty(id)) {
    delete cars[id];
  } else {
    throw new ReferenceError("No such ID in database.");
  }

  await write(cars);
}

async function editById(id, newCar) {
  const cars = await read();

  if (cars.hasOwnProperty(id)) {
    cars[id] = newCar;
  } else {
    throw new ReferenceError("No such ID in database.");
  }

  await write(cars);
}

function nextId() {
  return "xxxxxxxx-xxxx".replace(/x/g, () =>
    ((Math.random() * 16) | 0).toString()
  );
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
