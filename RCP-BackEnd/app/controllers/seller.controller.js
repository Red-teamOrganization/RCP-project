const sellerModel = require("../database/models/seller.model");

class Seller {
  static signUp = async (req, res) => {
    try {
      const seller = new sellerModel(req.body);
      const token = await seller.generateToken();
      await seller.save();
      res.status(200).send({
        apiStatus: true,
        data: { seller, token },
        message: "seller added successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static logIn = async (req, res) => {
    try {
      const sellerData = await sellerModel.login(req.body.email, req.body.password);
      const token = await sellerData.generateToken();
      res.status(200).send({
        apiStatus: true,
        data: { sellerData, token },
        message: "logged in as seller",
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
      let index = req.seller.tokens.findIndex((token) => token == req.sellerToken);
      req.seller.tokens.splice(index, 1);
      await req.seller.save();
      res.status(200).send({
        apiStatus: true,
        data: req.seller,
        message: "seller logged out ",
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
      req.seller.tokens = [];
      await req.seller.save();
      res.status(200).send({
        apiStatus: true,
        data: req.seller,
        message: "seller logged out from all devices",
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

module.exports = Seller;
