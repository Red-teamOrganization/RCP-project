const router = require("express").Router();
const sellerDonationController = require("../app/controllers/sellerDonations.controller");
const sellerAuth = require("../app/middleware/sellerAuth")

router.post("/addSellerDonation",sellerAuth,sellerDonationController.addSellerDonation);

router.get("/myDonations",sellerAuth, sellerDonationController.myDonations);

router.delete("/deleteDonation/:id",sellerAuth,sellerDonationController.deleteDonation)


router.patch("/editDonation/:id",sellerAuth,sellerDonationController.editDonation)

module.exports = router;