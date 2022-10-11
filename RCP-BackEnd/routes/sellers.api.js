const router = require("express").Router();
const sellerController = require("../app/controllers/seller.controller");
const sellerAuth = require("../app/middleware/sellerAuth")

router.post("/signUp", sellerController.signUp);

router.post("/logIn", sellerController.logIn);

router.get("/logOut",sellerAuth, sellerController.logOut);

router.get("/sellerProfile",sellerAuth, sellerController.sellerProfile);

router.get("/logOutAll",sellerAuth, sellerController.logOutAll);


module.exports = router;
