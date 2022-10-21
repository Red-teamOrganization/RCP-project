const jwt = require("jsonwebtoken");

const User = require("../database/models/user.model");

const producerAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", ""); 
    const decoded = jwt.verify(token, "RCP"); 
    const producerData = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
      "userType": 'producer',
    }); 
    
    if (!producerData) throw new Error("unAuthorized"); 
    req.producer = producerData; 
    req.producerToken = token; 
    next(); 
  } catch (e) {
    res.status(500).send({ apiStatus: false, data: e, message: e.message });
  }
};

module.exports = producerAuth;