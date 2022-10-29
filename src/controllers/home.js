module.exports = {
  async home(req, res) {
    const cars = await req.storage.getAll(req.query);

    res.locals = {
      cars: cars,
      query: req.query,
    };

    res.render("index", { title: "Carbicle | Home" });
  },
};
