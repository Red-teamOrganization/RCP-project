const router = require("express").Router();
const soldProductsController = require("../app/controllers/soldProducts.controller");
const sellerAuth = require("../app/middleware/sellerAuth")

router.post("/addSoldProduct",sellerAuth, soldProductsController.addProduct);


module.exports = router;