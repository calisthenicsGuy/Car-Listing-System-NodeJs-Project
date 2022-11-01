const express = require("express");
const handlebars = require("express-handlebars");
const expressSession = require("express-session");
const { body } = require("express-validator");

const initDb = require("./models/index");

const { home } = require("./controllers/home");
const { about } = require("./controllers/about");
const { details } = require("./controllers/details");
const { notFound } = require("./controllers/notFound");
const { deleteGet, deletePost } = require("./controllers/delete");
const { createGet, createPost } = require("./controllers/create");
const { editGet, editPost } = require("./controllers/edit");

const authController = require("./controllers/auth");

const accessory = require("./controllers/accessory");
const attach = require("./controllers/attach");

const carsService = require("./services/cars");
const accessoryService = require("./services/accessory");
const authService = require("./services/auth");

const { isLoggedIn } = require("./services/utils");

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

  app
    .route("/create")
    .get(isLoggedIn, createGet)
    .post(isLoggedIn, createPost);

  app
    .route("/delete/:id")
    .get(isLoggedIn, deleteGet)
    .post(isLoggedIn, deletePost);

  app
    .route("/edit/:id")
    .get(isLoggedIn, editGet)
    .post(isLoggedIn, editPost);

  app
    .route("/accessory")
    .get(isLoggedIn, accessory.get)
    .post(isLoggedIn, accessory.post);

  app
    .route("/attach/:id")
    .get(isLoggedIn, attach.get)
    .post(isLoggedIn, attach.post);

  app.use(authController);

  app.get("*", notFound);

  app.listen(3000, () => {
    console.log("Server started on port 3000.");
  });
}

// app
//   .route("/register")
//   .get(registerGet)
//   .post(
//     body("username").trim().toLowerCase(),
//     body("password").trim(),
//     body("repeatPassword").trim(),
//     body("username")
//       .isLength({ min: 3 })
//       .withMessage("Username field must be at least 3 symbols")
//       .bail()
//       .isAlphanumeric()
//       .withMessage("Username may contains only letters and numbers"),
//     body("password")
//       .notEmpty()
//       .withMessage("Password field is required")
//       .isLength({ min: 6 })
//       .withMessage("Password field must be at least 6 symbols"),
//     body("repeatPassword")
//       .custom((value, { req }) => {
//         return value == req.body.password;
//       })
//       .withMessage("Passwords doesn't match!"),
//     registerPost
//   );
