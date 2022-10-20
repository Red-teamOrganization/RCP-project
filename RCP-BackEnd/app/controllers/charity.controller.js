const charityModel = require("../database/models/charity.model");
const path = require("path");
const fs = require("fs");
const User = require("../database/models/user.model");

class Charity {
  static signUp = async (req, res) => {
    try {

      const user = new User(req.body);
      const token = await user.generateToken();
      await user.save();
      const charity = new charityModel();
      charity.user = user;
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

  static charityProfile = async (req, res) => {
    try {
      res.status(200).send({
        apiStatus: true,
        data: req.entity,
        message: "charity profile",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static charityLogoUpload = async (req, res) => {
    try {
      let oldImg;

      if (!req.file.path) throw new Error('no input image');

      if (req.entity.image) oldImg = path.join(__dirname, "../../", req.entity.image);
      else oldImg = null;

      if (oldImg) fs.unlinkSync(oldImg);

      req.entity.image = req.file.path;

      await req.entity.save();

      res.status(200).send({
        apiStatus: true,
        data: req.entity,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        date: e,
        message: e.message,
      });
    }
  };

  static addCharityDescription = async (req, res) => {
    try {
      req.entity.description = req.body.description;
      await req.entity.save()
      res.status(200).send({
        apiStatus: true,
        data: req.entity,
      });

    }
    catch (e) {
      res.status(500).send({
        apiStatus: false,
        date: e,
        message: e.message,
      });
    }

  }

  static checkDonation = async (req, res) => {
    try {
      let don = req.entity.donations.find((donation) => donation._id == req.params.id)
      don.checked = !don.checked;
      await req.entity.save()
      res.status(200).send({
        apiStatus: true,
        data: req.entity.donations,
      });

    }
    catch (e) {
      res.status(500).send({
        apiStatus: false,
        date: e,
        message: e.message,
      });
    }

  }

  // static logIn = async (req, res) => {
  //   try {
  //     const user = await User.login(req.body.email, req.body.password);
  //     const token = await user.generateToken();
  //     res.status(200).send({
  //       apiStatus: true,
  //       data: { user, token },
  //       message: `logged in as ${user.userType}`,
  //     });
  //   } catch (e) {
  //     res.status(500).send({
  //       apiStatus: false,
  //       data: e,
  //       message: e.message,
  //     });
  //   }
  // };

  // static logOut = async (req, res) => {
  //   try {
  //     let index = req.user.tokens.findIndex((token) => token == req.userToken);
  //     req.usertokens.splice(index, 1);
  //     await req.entity.save();
  //     res.status(200).send({
  //       apiStatus: true,
  //       data: req.seller,
  //       message: "charity logged out ",
  //     });
  //   } catch (e) {
  //     res.status(500).send({
  //       apiStatus: false,
  //       data: e,
  //       message: e.message,
  //     });
  //   }
  // };

  // static logOutAll = async (req, res) => {
  //   try {
  //     console.log(req.user)
  //     req.user.tokens = [];
  //     await req.user.save();
  //     res.status(200).send({
  //       apiStatus: true,
  //       data: req.user,
  //       message: "user logged out from all devices",
  //     });
  //   } catch (e) {
  //     res.status(500).send({
  //       apiStatus: false,
  //       data: e,
  //       message: e.message,
  //     });
  //   }
  // };


}

module.exports = Charity;