module.exports = {
  async get(req, res) {
    try {
      const id = req.params.id;
      const [car, accessories] = await Promise.all([
        req.storage.getById(id),
        req.accessory.getAll(),
      ]);

      const existingIds = car.accessories.map(a => a.id.toString());
      let availableAccessories = accessories.filter(a => existingIds.includes(a.id.toString()) == false);

      // accessories.forEach((accessory) => {
      //   let isAvailable = true;
      //   for (const carAccessory of car.accessories) {
      //     if (carAccessory.id.toLowerCase() == accessory.id.toLowerCase()) {
      //       isAvailable = false;
      //       break;
      //     }
      //   }

      //   if (isAvailable) {
      //     availableAccessories.push(accessory);
      //   }
      // });

      res.locals = {
        car,
        accessories: availableAccessories,
      };

      res.render("attach", { title: "Attach Accessory" });
    } catch (error) {
      console.log(error.message);
      res.render("404");
    }
  },
  async post(req, res) {
    try {
      await req.storage.attachAccessory(req.params.id, req.body.accessory);
      await req.accessory.attachCar(req.body.accessory, req.params.id);
      res.redirect("/");
    } catch (error) {
      console.log(error.message);
      res.redirect(`/attach/${req.params.id}`);
    }
  },
};
