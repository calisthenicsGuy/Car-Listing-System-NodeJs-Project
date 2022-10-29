module.exports = {
  async editGet(req, res) {
    const car = await req.storage.getById(req.params.id);

    res.locals = {
      car: car,
    };

    res.render("edit", { title: `Edit ${car.name}` });
  },

  async editPost(req, res) {
    const data = req.body;

    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        res.redirect("/404");
      }
    });

    const car = {
      name: data.name,
      price: Number(data.price),
      imageUrl: data.imageUrl,
      description: data.description,
    };

    try {
      await req.storage.editById(req.params.id, car);
      res.redirect("/");
    } catch (error) {
      res.redirect("/404");
    }
  },
};
