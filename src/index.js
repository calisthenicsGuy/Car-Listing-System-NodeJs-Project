const express = require("express");
const handlebars = require("express-handlebars");

const { home } = require("./controllers/home");
const { about } = require("./controllers/about");
const { details } = require("./controllers/details");
const { notFound } = require("./controllers/notFound");
const { createGet, createPost } = require("./controllers/create");

const carsService = require("./services/cars");

const app = express();
const hbs = handlebars.create({ extname: ".hbs" });

app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("static"));

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.use(carsService());

app.get("/", home);
app.get("/about", about);
app.get("/details/:id", details);
app.get("/create", createGet);
app.post("/create", createPost);
app.get("*", notFound);

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
