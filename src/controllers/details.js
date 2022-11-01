module.exports = {
  async details(req, res) {
    const car = await req.storage.getById(req.params.id);

    if (req.session.user && req.session.user.id == car.owner) {
      car.isOwner = true;
    }

    if (car) {
      res.locals = {
        car: car,
      };

      res.render("details", { title: `${car["name"]} | Details` });
    } else {
      res.redirect("/404");
    }
  },
};
