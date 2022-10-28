module.exports = {
  async notFound(req, res) {
    res.statusCode = 404;
    res.render("404", { title: "Page Not Found | 404" });
  },
};
