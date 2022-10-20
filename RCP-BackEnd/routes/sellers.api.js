const router = require("express").Router();
const sellerController = require("../app/controllers/seller.controller");
const sellerAuth = require("../app/middleware/sellerAuth")
const upload = require("../app/middleware/file.upload");

router.post("/signUp", sellerController.signUp);

router.post("/logIn", sellerController.logIn);

router.get("/logOut",sellerAuth, sellerController.logOut);

router.get("/sellerProfile",sellerAuth, sellerController.sellerProfile);

router.post(
    "/sellerProfile/sellerLogo",
    sellerAuth,
    upload.single("logo"),
    sellerController.sellerLogoUpload
  );
router.post("/sellerProfile/sellerDescription",sellerAuth,sellerController.addSellerDescription);
router.get("/logOutAll",sellerAuth, sellerController.logOutAll);



module.exports = router;
