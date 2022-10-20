const User = require("../database/models/user.model");

class UserController {
  // static signUp = async (req, res) => {
  //   try {

  //     const user = new User(req.body);
  //     const token = await user.generateToken();
  //     await user.save();
  //     res.status(200).send({
  //       apiStatus: true,
  //       data: { user, token },
  //       message: "user added successfully",
  //     });
  //   } catch (e) {
  //     res.status(500).send({
  //       apiStatus: false,
  //       data: e,
  //       message: e.message,
  //     });
  //   }
  // };

  static logIn = async (req, res) => {
    try {
      const user = await User.login(req.body.email, req.body.password);
      const token = await user.generateToken();
      res.status(200).send({
        apiStatus: true,
        data: { user, token },
        message: `logged in as ${user.userType}`,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static logOut = async (req, res) => {
    try {
      console.log("user")
      let index = req.user.tokens.findIndex((token) => token == req.userToken);
      req.user.tokens.splice(index, 1);
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        data: req.seller,
        message: "user logged out ",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static logOutAll = async (req, res) => {
    try {
      console.log(req.user)
      req.user.tokens = [];
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        data: req.user,
        message: "user logged out from all devices",
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

module.exports = UserController;