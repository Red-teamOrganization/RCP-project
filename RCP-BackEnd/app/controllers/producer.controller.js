const producerModel = require("../database/models/producer.model");
const path = require("path");
const fs = require("fs");

class Producer {
  static signUp = async (req, res) => {
    try {
      const user = new User(req.body);
      const token = await user.generateToken();
      await user.save();
      const producer = new producerModel();
      producer.user = user;
      await producer.save();
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

  static producerProfile = async (req, res) => {
    try {
      res.status(200).send({
        apiStatus: true,
        data: req.entity,
        message: "producer profile",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static producerLogoUpload = async (req, res) => {
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

  static addProducerDescription = async (req, res) => {
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
  //     const producerData = await producerModel.login(req.body.email, req.body.password);
  //     const token = await producerData.generateToken();
  //     res.status(200).send({
  //       apiStatus: true,
  //       data: { producerData, token },
  //       message: "logged in as producer",
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
  //     let index = req.user.tokens.findIndex((token) => token == req.sellerToken);
  //     req.user.tokens.splice(index, 1);
  //     await req.user.save();
  //     res.status(200).send({
  //       apiStatus: true,
  //       data: req.user,
  //       message: "producer logged out ",
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
  //     req.producer.tokens = [];
  //     await req.producer.save();
  //     res.status(200).send({
  //       apiStatus: true,
  //       data: req.producer,
  //       message: "producer logged out from all devices",
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

module.exports = Producer;
