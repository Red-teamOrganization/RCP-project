const jwt = require("jsonwebtoken");

const sellerModel = require("../database/models/seller.model");

const sellerAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", ""); 
    const decoded = jwt.verify(token, "RCP"); 
    const sellerData = await sellerModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
      "userType": 'seller',
    }); 
    
    if (!sellerData) throw new Error("unAuthorized"); 
    req.seller = sellerData; 
    req.sellerToken = token; 
    next(); 
  } catch (e) {
    res.status(500).send({ apiStatus: false, data: e, message: e.message });
  }
};

module.exports = sellerAuth;