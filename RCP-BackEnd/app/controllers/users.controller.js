const userModel = require("../database/models/user.model");

class User {
  static signUp = async (req, res) => {
    try {
      const user = new userModel(req.body);
      const token = await user.generateToken();
      await user.save();
      res.status(200).send({
        apiStatus: true,
        data: { user, token },
        message: "user added successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

}

module.exports = User;
