const User = require("../database/models/user.model");
class Home {
  static honorList = async (req, res) => {
    try {
      let users = await User.find();
      const filtered = users.filter(user=> user.userType === "producer" || user.userType === "seller")
      filtered.sort((a, b) =>  b.numberOfDonations - a.numberOfDonations);

      res.status(200).send({
        apiStatus: true,
        data: filtered,
        message: "seller and producers on honor list fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static allCharities = async (req, res) => {
    try {
      let charities = await User.find({userType:"charity"});
      res.status(200).send({
        apiStatus: true,
        data: charities,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        date: e,
        message: e.message,
      });
    }
  };
}

module.exports = Home;
