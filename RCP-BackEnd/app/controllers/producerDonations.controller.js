const producerDonationModel = require("../database/models/producerDonations.model");

class ProducerDonation {
  static addProducerDonation = async (req, res) => {
    try {
      const charity = await charityModel.findOne({name:req.body.charityName})
      if(charity.location != req.producer.location) {
        throw new Error('you must enter a charity in your location')
      }
      
      const donationData = new producerDonationModel({
        ...req.body,
        charityId:charity._id,
        donatorId: req.producer._id,
        donatorName: req.producer.name,
        location: req.producer.location,
      });
      charity.donations.push({ 
        donationId:donationData._id,
        donatorId: req.producer._id,
        donatorName: req.producer.name,
        location: req.producer.location,
        productName:req.body.productName,
        quantity:req.body.quantity,
        category:req.body.category,
        checked:false,
      })
      req.producer.numberOfDonations += 1
      await req.producer.save();
      await charity.save();
      await donationData.save();
      res.status(200).send({
        apiStatus: true,
        data: donationData,
        message: "donation added by producer",
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
      await req.producer.populate("myDonations");
      res.status(200).send({
        apiStatus: true,
        data: req.producer.myDonations,
        message: "producer donations fetched",
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
        const producerDonation = await producerDonationModel.findById(req.params.id)
        
        const charity = await charityModel.findById(producerDonation.charityId)
    
        const donation = charity.donations.find(don=>don.donationId==req.params.id)
        if(donation.checked){
          throw new Error("the charity has already receive your donation")
        }
        await producerDonationModel.findOneAndDelete({
          _id: req.params.id,
          donatorId: req.producer._id,
        });
        const index = charity.donations.findIndex(don=> don.donationId == req.params.id)
        charity.donations.splice(index,1)
        req.producer.numberOfDonations -= 1
        await req.producer.save();
        await req.producer.populate("myDonations");
        await req.producer.save();
        await charity.save();

        res.status(200).send({
          apiStatus: true,
          data: req.producer.myDonations,
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
        const producerDonation = await producerDonationModel.findOne({
          _id: req.params.id,
          donatorId: req.producer._id,
        });
        
        const charity = await charityModel.findById(producerDonation.charityId)
    
        const donation = charity.donations.find(don=>don.donationId==req.params.id)
        if(donation.checked){
          throw new Error("the charity has already receive your donation")
        }
      
    
        updates.forEach((key) => (producerDonation[key] = req.body[key]));
        updates.forEach((key) => (donation[key] = req.body[key]));
      

        await req.producer.populate("myDonations");
        await producerDonation.save();
        await charity.save();

        res.status(200).send({
          apiStatus: true,
          data: producerDonation,
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
  
  module.exports = ProducerDonation;
  