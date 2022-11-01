module.exports = {
  async editGet(req, res) {
    const car = await req.storage.getById(req.params.id);

    if (car.owner != req.session.user.id) {
      console.log("User is not owner.");
      return res.redirect("/login");
    }
    res.locals = {
      car: car,
    };

    res.render("edit", { title: `Edit ${car.name}` });
  },

  async editPost(req, res) {
    const data = req.body;

    const car = {
      name: data.name,
      price: Number(data.price),
      imageUrl: data.imageUrl,
      description: data.description,
    };

    try {
      await req.storage.editById(req.params.id, car, req.session.user.id);
      res.redirect("/");
    } catch (error) {
      res.redirect("/404");
    }
  },
};
