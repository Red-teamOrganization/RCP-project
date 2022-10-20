const router = require("express").Router();
const sellerController = require("../app/controllers/seller.controller");
const upload = require("../app/middleware/file.upload");
const UserController = require("../app/controllers/user.controller");
const userAuth = require("../app/middleware/userAuth");

router.post("/signUp", sellerController.signUp);

router.post("/logIn", UserController.logIn);

router.get("/logOut", userAuth, UserController.logOut);

router.get("/sellerProfile", userAuth, sellerController.sellerProfile);

router.post(
  "/sellerProfile/sellerLogo",
  userAuth,
  upload.single("logo"),
  sellerController.sellerLogoUpload
);
router.post("/sellerProfile/sellerDescription", userAuth, sellerController.addSellerDescription);
router.get("/logOutAll", userAuth, UserController.logOutAll);



module.exports = router;
