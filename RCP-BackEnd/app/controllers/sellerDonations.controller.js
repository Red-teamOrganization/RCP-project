const sellerDonationModel = require("../database/models/sellerDonations.model");
const charityModel = require("../database/models/charity.model")
class SellerDonation {
  static addSellerDonation = async (req, res) => {
    try {
      const charity = await charityModel.findOne({name:req.body.charityName})
      if(charity.location != req.seller.location) {
        throw new Error('you must enter a charity in your location')
      }
      const donationData = new sellerDonationModel({
        ...req.body,
        charityId:charity._id,
        donatorId: req.seller._id,
        donatorName: req.seller.name,
        location: req.seller.location,
      });
      charity.donations.push({ 
        donationId:donationData._id,
        donatorId: req.seller._id,
        donatorName: req.seller.name,
        location: req.seller.location,
        productName:req.body.productName,
        quantity:req.body.quantity,
        category:req.body.category,
        checked:false,
      })
      await charity.save();
      await donationData.save();
      res.status(200).send({
        apiStatus: true,
        data: donationData,
        message: "donation added by seller",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };

  static myDonations = async (req, res) => {
    try {
      await req.seller.populate("myDonations");
      res.status(200).send({
        apiStatus: true,
        data: req.seller.myDonations,
        message: "seller donations fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

    static deleteDonation = async (req, res) => {
      try {
        const sellerDonation = await sellerDonationModel.findById(req.params.id)
        
        const charity = await charityModel.findById(sellerDonation.charityId)
    
        const donation = charity.donations.find(don=>don.donationId==req.params.id)
        if(donation.checked){
          throw new Error("the charity has already receive your donation")
        }
        await sellerDonationModel.findOneAndDelete({
          _id: req.params.id,
          donatorId: req.seller._id,
        });
        const index = charity.donations.findIndex(don=> don.donationId == req.params.id)
        charity.donations.splice(index,1)

        await req.seller.populate("myDonations");
        await req.seller.save();
        await charity.save();

        res.status(200).send({
          apiStatus: true,
          data: req.seller.myDonations,
          message: "donation deleted",
        });
      } catch (e) {
        res.status(500).send({
          apiStatus: false,
          data: e,
          message: e.message,
        });
      }
     };

    static editDonation = async (req, res) => {
      try {
        const updates = Object.keys(req.body);
        const sellerDonation = await sellerDonationModel.findOne({
          _id: req.params.id,
          donatorId: req.seller._id,
        });
        
        const charity = await charityModel.findById(sellerDonation.charityId)
    
        const donation = charity.donations.find(don=>don.donationId==req.params.id)
        if(donation.checked){
          throw new Error("the charity has already receive your donation")
        }
      
    
        updates.forEach((key) => (sellerDonation[key] = req.body[key]));
        updates.forEach((key) => (donation[key] = req.body[key]));
      

        await req.seller.populate("myDonations");
        await sellerDonation.save();
        await charity.save();

        res.status(200).send({
          apiStatus: true,
          data: sellerDonation,
          message: "donation edited",
        });
      } catch (e) {
        res.status(500).send({
          apiStatus: false,
          data: e,
          message: e.message,
        });
      }
    }
  
  }
  
  module.exports = SellerDonation;
  