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
    const jsonData = JSON.stringify(data);
    await fs.writeFile(FILE_PATH, jsonData);
  } catch (error) {
    console.error("Database write error.");
    console.error(error);
    process.exit(1);
  }
}

async function getAll() {
  const data = await read();

  return Object.entries(data).map(([id, value]) =>
    Object.assign({}, { id }, value)
  );
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
  };

  next();
};
