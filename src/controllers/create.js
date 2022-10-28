module.exports = {
  createGet(req, res) {
    res.render("create", { title: "Create Listing" });
  },
  async createPost(req, res) {
    const data = req.body;

    const car = {
      name: data.name,
      price: data.price,
      imageUrl: data.imageUrl,
      description: data.description,
    };

    try {
      await req.storage.createCar(car);
      res.redirect("/");
    } catch (error) {
      await res.render("/create", { title: "Create Listing" });
    }
  },
};
