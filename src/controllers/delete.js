module.exports = {
  async deleteGet(req, res) {
    const car = await req.storage.getById(req.params.id);

    if (car) {
      res.render("delete", { title: "Delete Listing", car: car });
    } else {
      res.redirect("/404");
    }
  },

  async deletePost(req, res) {
    try {
      await req.storage.deleteById(req.params.id);
      res.redirect("/");
    } catch (error) {
      res.redirect("/404");
    }
  },
};
