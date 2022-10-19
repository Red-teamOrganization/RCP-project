const producerModel = require("../database/models/producer.model");
const path = require("path");
const fs = require("fs");

class Producer {
  static signUp = async (req, res) => {
    try {
      const producer = new producerModel(req.body);
      const token = await producer.generateToken();
      await producer.save();
      res.status(200).send({
        apiStatus: true,
        data: { producer, token },
        message: "producer added successfully",
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
        data: req.producer,
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
      
      if (! req.file.path ) throw new Error('no input image');

      if (req.producer.image) oldImg = path.join(__dirname, "../../", req.producer.image);
      else oldImg = null;

      if (oldImg) fs.unlinkSync(oldImg); 
      
      req.producer.image = req.file.path;

      await req.producer.save();

      res.status(200).send({
        apiStatus: true,
        data: req.producer,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        date: e,
        message: e.message,
      });
    }
  };

  static addProducerDescription = async (req , res)=>{
    try{
        req.producer.description = req.body.description;
        await req.producer.save()
        res.status(200).send({
          apiStatus: true,
          data: req.producer,
        });
      
    }
    catch(e){
      res.status(500).send({
        apiStatus: false,
        date: e,
        message: e.message,
      });
    }
   
  }

  static logIn = async (req, res) => {
    try {
      const producerData = await producerModel.login(req.body.email, req.body.password);
      const token = await producerData.generateToken();
      res.status(200).send({
        apiStatus: true,
        data: { producerData, token },
        message: "logged in as producer",
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
      let index = req.producer.tokens.findIndex((token) => token == req.sellerToken);
      req.producer.tokens.splice(index, 1);
      await req.producer.save();
      res.status(200).send({
        apiStatus: true,
        data: req.producer,
        message: "producer logged out ",
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
      req.producer.tokens = [];
      await req.producer.save();
      res.status(200).send({
        apiStatus: true,
        data: req.producer,
        message: "producer logged out from all devices",
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

module.exports = Producer;
