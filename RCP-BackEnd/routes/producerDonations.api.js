const router = require("express").Router();
const producerDonationController = require("../app/controllers/producerDonations.controller");
const producerAuth = require("../app/middleware/producer.Auth")

router.post("/addProducerDonation",producerAuth,producerDonationController.addProducerDonation);

router.get("/myDonations",producerAuth, producerDonationController.myDonations);

router.delete("/deleteDonation/:id",producerAuth,producerDonationController.deleteDonation)

router.patch("/editDonation/:id",producerAuth,producerDonationController.editDonation)

module.exports = router;