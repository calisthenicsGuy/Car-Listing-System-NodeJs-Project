// const validator = require("validator");
const { validationResult, body } = require("express-validator");
const { Router } = require("express");
const { mapError } = require("../services/utils");

const router = Router();

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.post(
  "/register",
  body("username").trim().toLowerCase(),
  body("password").trim(),
  body("repeatPassword").trim(),
  body("username")
    .isAlphanumeric()
    .withMessage("Username may contains only letters and numbers.")
    .isLength({ min: 5 })
    .withMessage("Username field must be at least 5 symbols long."),
  body("password")
    .notEmpty()
    .withMessage("Password field is required")
    .isLength({ min: 8 })
    .withMessage("Password field must be at least 8 symbols"),
  body("repeatPassword")
    .custom((value, { req }) => {
      return value == req.body.password;
    })
    .withMessage("Passwords doesn't match!"),
  async (req, res) => {
    const { errors } = validationResult(req);

    try {
      if (errors.length) {
        throw errors;
      }
      await req.auth.register(req.body.username, req.body.password);
      res.redirect("/");
    } catch (errors) {
      // const passwordErrors = [];

      // errors.map((error) => {
      //   if (error.param == "password" || error.param == "repeatPassword") {
      //     passwordErrors.push(error.msg);
      //   }
      // });

      res.render("register", {
        title: "Register",
        errors: mapError(errors),
        // passwordErrors: passwordErrors,
        data: { username: req.body.username },
      });
    }
  }
);

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/login", async (req, res) => {
  try {
    await req.auth.login(req.body.username, req.body.password);
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    res.render("login", { title: "Login", errors: [{ msg: error.message }] });
  }
});

router.get("/logout", (req, res) => {
  req.auth.logout();
  res.redirect("/");
});

module.exports = router;
