const jwt = require("jsonwebtoken");

const User = require("../database/models/user.model");

const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const decoded = jwt.verify(token, "RCP");
  
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
      "userType": decoded.user_type,
    });
    
    if (!user) throw new Error("unAuthorized");
    req.user = user
    req.entity = user;
    req.userToken = token;
    next();
  } catch (e) {
    res.status(500).send({ apiStatus: false, data: e, message: e.message });
  }
};

module.exports = userAuth;