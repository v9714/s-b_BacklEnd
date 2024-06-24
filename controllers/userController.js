const userModel = require("../models/userModel");

class UserController {
  async updateUser(req, res) {
    try {
      const { id } = req.user;
      const result = await userModel.PatchUpdate(id, req.body);
      if (result) {
        res.status(200).json(result);
      } else {
        return res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      console.error("Internal Server Error:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async fetchUserById(req, res) {
    const { id } = req.user;
    try {
      const user = await userModel.userModel.findById(id);
      let doc = user._doc;
      delete doc.password;
      delete doc.salt;
      // delete doc._id;
      res.status(200).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

let userController = new UserController();
module.exports = userController;
