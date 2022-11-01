const { mapError } = require("../services/utils");

module.exports = {
  get(req, res) {
    res.render("createAccessory", { title: "Create Accessory" });
  },
  async post(req, res) {
    const data = req.body;

    const accessory = {
      name: data.name,
      price: Number(data.price),
      imageUrl: data.imageUrl,
      description: data.description,
      owner: req.session.user.id,
    };

    try {
      await req.accessory.createAccessory(accessory);
      res.redirect("/");
    } catch (error) {
      res.render("createAccessory", {
        title: "Create Accessory",
        accessory: accessory,
        errors: mapError(error),
      });
    }
  },
};
