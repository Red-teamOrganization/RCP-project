const jwt = require("jsonwebtoken");
const Charity = require("../database/models/charity.model");
const Producer = require("../database/models/producer.model");
const Seller = require("../database/models/seller.model");

const User = require("../database/models/user.model");

const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const decoded = jwt.verify(token, "RCP");
    let userData;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
      "userType": decoded.user_type,
    });
    switch (decoded.user_type) {
      case 'seller':
        userData = Seller.findOne({
          "user._id": decoded._id,
        })
      case 'producer':
        userData = Producer.findOne({
          "user._id": decoded._id,
        })
      case 'charity':
        userData = await Charity.findOne({
          "user._id": decoded._id,
        })
    }
    if (!userData || !user) throw new Error("unAuthorized");
    req.user = user
    req.entity = userData;
    req.userToken = token;
    next();
  } catch (e) {
    res.status(500).send({ apiStatus: false, data: e, message: e.message });
  }
};

module.exports = userAuth;