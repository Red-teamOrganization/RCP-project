const router = require("express").Router();
const soldProductsController = require("../app/controllers/soldProducts.controller");
const sellerAuth = require("../app/middleware/sellerAuth")

router.post("/addSoldProduct",sellerAuth, soldProductsController.addProduct);
router.get("/mySoldProducts",sellerAuth, soldProductsController.mySoldProducts);
router.get("/allSellerAgricultureProducts",soldProductsController.totalAgricultureSoldProducts)
router.get("/allSellerDiaryProducts",soldProductsController.totalDiarySoldProducts)
router.get("/allSellerProteinProducts",soldProductsController.totalProteinSoldProducts)
router.patch("/editSoldProduct/:id",sellerAuth,soldProductsController.editSoldProduct)
router.delete("/deleteSoldProduct/:id",sellerAuth,soldProductsController.deleteSoldProduct)
module.exports = router;