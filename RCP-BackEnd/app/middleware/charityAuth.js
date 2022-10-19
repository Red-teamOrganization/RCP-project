const jwt = require("jsonwebtoken");

const charityModel = require("../database/models/charity.model");

const charityAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", ""); 
    const decoded = jwt.verify(token, "RCP"); 
    const charityData = await charityModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
      "userType": 'charity',
    }); 
    
    if (!charityData) throw new Error("unAuthorized"); 
    req.charity = charityData; 
    req.charityToken = token; 
    next(); 
  } catch (e) {
    res.status(500).send({ apiStatus: false, data: e, message: e.message });
  }
};

module.exports = charityAuth;