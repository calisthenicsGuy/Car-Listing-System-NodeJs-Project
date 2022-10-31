const express = require("express");
const handlebars = require("express-handlebars");
const expressSession = require("express-session");

const initDb = require("./models/index");

const { home } = require("./controllers/home");
const { about } = require("./controllers/about");
const { details } = require("./controllers/details");
const { notFound } = require("./controllers/notFound");
const { deleteGet, deletePost } = require("./controllers/delete");
const { createGet, createPost } = require("./controllers/create");
const { editGet, editPost } = require("./controllers/edit");
const {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  lgout,
} = require("./controllers/auth");
const accessory = require("./controllers/accessory");
const attach = require("./controllers/attach");

const carsService = require("./services/cars");
const accessoryService = require("./services/accessory");
const authService = require("./services/auth");

start();

async function start() {
  await initDb();

  const app = express();
  const hbs = handlebars.create({ extname: ".hbs" });

  app.use(
    expressSession({
      secret: "super secret",
      reasev: false,
      saveUninitialized: true,
      cookie: { secure: "auto" },
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));

  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");

  app.use(carsService());
  app.use(accessoryService());
  app.use(authService());

  app.get("/", home);
  app.get("/about", about);
  app.get("/details/:id", details);
  app.route("/create").get(createGet).post(createPost);
  app.route("/delete/:id").get(deleteGet).post(deletePost);
  app.route("/edit/:id").get(editGet).post(editPost);
  app.route("/accessory").get(accessory.get).post(accessory.post);
  app.route("/attach/:id").get(attach.get).post(attach.post);
  app.route("/register").get(registerGet).post(registerPost);
  app.route("/login").get(loginGet).post(loginPost);
  app.get("/logout", lgout);

  app.get("*", notFound);

  app.listen(3000, () => {
    console.log("Server started on port 3000.");
  });
}
