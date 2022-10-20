const router = require("express").Router();
const charityController = require("../app/controllers/charity.controller");
const userAuth = require("../app/middleware/userAuth")
const upload = require("../app/middleware/file.upload");
const UserController = require("../app/controllers/user.controller");

router.post("/signUp", charityController.signUp);

router.post("/logIn", UserController.logIn);

router.get("/logOut", userAuth, UserController.logOut);

router.get("/charityProfile", userAuth, charityController.charityProfile);

router.post(
  "/charityProfile/charityLogo",
  userAuth,
  upload.single("logo"),
  charityController.charityLogoUpload
);
router.post("/charityProfile/charityDescription", userAuth, charityController.addCharityDescription);
router.post("/charityProfile/donationCheck/:id", userAuth, charityController.checkDonation);
router.get("/logOutAll", userAuth, UserController.logOutAll);




module.exports = router;