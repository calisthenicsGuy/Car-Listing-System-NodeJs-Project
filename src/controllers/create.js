const { mapError } = require("../services/utils");

module.exports = {
  createGet(req, res) {
    res.render("create", { title: "Create Listing" });
  },
  async createPost(req, res) {
    const data = req.body;

    // Object.values(data).forEach((value) => {
    //   if (!value) {
    //     res.redirect("/");
    //   }
    // });

    const car = {
      name: data.name,
      price: Number(data.price),
      imageUrl: data.imageUrl,
      description: data.description,
      owner: req.session.user.id,
    };

    try {
      await req.storage.createCar(car);
      res.redirect("/");
    } catch (error) {
      await res.render("create", { title: "Create Listing", errors: mapError(error), car: car });
    }
  },
};
