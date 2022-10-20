const sellerModel = require("../database/models/seller.model");
const producerModel = require("../database/models/producer.model")
const path = require("path");
const fs = require("fs");
class Seller {
  static signUp = async (req, res) => {
    try {

      const user = new User(req.body);
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
  static sellerProfile = async (req, res) => {
    try {
      res.status(200).send({
        apiStatus: true,
        data: req.entity,
        message: "seller profile",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static sellerLogoUpload = async (req, res) => {
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

  static addSellerDescription = async (req, res) => {
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

  // static logIn = async (req, res) => {
  //   try {
  //     const sellerData = await sellerModel.login(req.body.email, req.body.password);
  //     const token = await sellerData.generateToken();
  //     res.status(200).send({
  //       apiStatus: true,
  //       data: { sellerData, token },
  //       message: "logged in as seller",
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
  //     let index = req.entity.tokens.findIndex((token) => token == req.entityToken);
  //     req.entity.tokens.splice(index, 1);
  //     await req.entity.save();
  //     res.status(200).send({
  //       apiStatus: true,
  //       data: req.entity,
  //       message: "seller logged out ",
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
  //     req.entity.tokens = [];
  //     await req.entity.save();
  //     res.status(200).send({
  //       apiStatus: true,
  //       data: req.entity,
  //       message: "seller logged out from all devices",
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

module.exports = Seller;
