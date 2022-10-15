const charityModel = require("../database/models/charity.model");
const path = require("path");
const fs = require("fs");

class Charity {
  static signUp = async (req, res) => {
    try {
      const charity = new charityModel(req.body);
      const token = await charity.generateToken();
      await charity.save();
      res.status(200).send({
        apiStatus: true,
        data: { charity, token },
        message: "charity added successfully",
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
        data: req.charity,
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
      
      if (! req.file.path ) throw new Error('no input image');

      if (req.charity.image) oldImg = path.join(__dirname, "../../", req.charity.image);
      else oldImg = null;

      if (oldImg) fs.unlinkSync(oldImg); 
      
      req.charity.image = req.file.path;

      await req.charity.save();

      res.status(200).send({
        apiStatus: true,
        data: req.charity,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        date: e,
        message: e.message,
      });
    }
  };

  static addCharityDescription = async (req , res)=>{
    try{
        req.charity.description = req.body.description;
        await req.charity.save()
        res.status(200).send({
          apiStatus: true,
          data: req.charity,
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

  static checkDonation = async (req , res)=>{
    try{
       let don = req.charity.donations.find((donation)=>donation._id == req.params.id)
       don.checked = !don.checked;
        await req.charity.save()
        res.status(200).send({
          apiStatus: true,
          data: req.charity.donations,
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
      const charityData = await charityModel.login(req.body.email, req.body.password);
      const token = await charityData.generateToken();
      res.status(200).send({
        apiStatus: true,
        data: { charityData, token },
        message: "logged in as charity",
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
      let index = req.charity.tokens.findIndex((token) => token == req.sellerToken);
      req.charity.tokens.splice(index, 1);
      await req.charity.save();
      res.status(200).send({
        apiStatus: true,
        data: req.seller,
        message: "charity logged out ",
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
      req.charity.tokens = [];
      await req.charity.save();
      res.status(200).send({
        apiStatus: true,
        data: req.charity,
        message: "charity logged out from all devices",
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

module.exports = Charity;