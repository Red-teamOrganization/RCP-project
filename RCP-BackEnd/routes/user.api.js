const router = require("express").Router();

const upload = require("../app/middleware/file.upload");
const UserController = require("../app/controllers/user.controller");
const userAuth = require("../app/middleware/userAuth");

router.post("/signUp", UserController.signUp);
router.post("/logIn", UserController.logIn);

router.get("/profile", userAuth,UserController.myProfile);
router.post(
  "/logoUpload",
  userAuth,
  upload.single("logo"),
  UserController.logoUpload
);
router.post("/addDescription", userAuth, UserController.addDescription);

router.post("/charityProfile/donationCheck/:id", userAuth, UserController.checkDonation);

router.get("/logOut", userAuth, UserController.logOut);
router.get("/logOutAll", userAuth, UserController.logOutAll);



module.exports = router;