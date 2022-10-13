const router = require("express").Router();
const soldProductsController = require("../app/controllers/soldProducts.controller");
const sellerAuth = require("../app/middleware/sellerAuth")

router.post("/addSoldProduct",sellerAuth, soldProductsController.addProduct);
router.get("/mySoldProducts",sellerAuth, soldProductsController.mySoldProducts);
router.get("/allSellerAgricultureProducts",soldProductsController.totalAgricultureSoldProducts)
router.get("/allSellerDiaryProducts",soldProductsController.totalDiarySoldProducts)
router.get("/allSellerProteinProducts",soldProductsController.totalProteinSoldProducts)

module.exports = router;