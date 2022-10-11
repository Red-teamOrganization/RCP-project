const router = require("express").Router();
const sellerController = require("../app/controllers/seller.controller");


router.post("/signUp", sellerController.signUp);



module.exports = router;
