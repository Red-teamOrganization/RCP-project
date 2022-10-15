const router = require("express").Router();
const charityController = require("../app/controllers/charity.controller");
const charityAuth = require("../app/middleware/charityAuth")
const upload = require("../app/middleware/file.upload");

router.post("/signUp", charityController.signUp);

router.post("/logIn", charityController.logIn);

router.get("/logOut",charityAuth, charityController.logOut);

router.get("/charityProfile",charityAuth, charityController.charityProfile);

router.post(
    "/charityProfile/charityLogo",
    charityAuth,
    upload.single("logo"),
    charityController.charityLogoUpload
  );
router.post("/charityProfile/charityDescription",charityAuth,charityController.addCharityDescription);
router.post("/charityProfile/donationCheck/:id",charityAuth,charityController.checkDonation);
router.get("/logOutAll",charityAuth, charityController.logOutAll);


module.exports = router;