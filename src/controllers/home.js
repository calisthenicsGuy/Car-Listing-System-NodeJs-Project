module.exports = {
  async home(req, res) {
    const cars = await req.storage.getAll();
    console.log(cars);
    res.locals = {
      cars: cars,
    };

    res.render("index", { title: "Carbicle | Home" });
  },
};
