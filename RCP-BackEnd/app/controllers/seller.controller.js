const sellerModel = require("../database/models/seller.model");

class Seller {
  static signUp = async (req, res) => {
    try {
      const user = new sellerModel(req.body);
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

}

module.exports = Seller;
