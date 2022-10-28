module.exports = {
  async about(req, res) {
    res.render("about", { title: "Carbicle | About" });
  },
};
