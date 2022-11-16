const router = require("express").Router();
const soldProductsController = require("../app/controllers/soldProducts.controller");
const sellerAuth = require("../app/middleware/sellerAuth")

router.post("/addSoldProduct",sellerAuth, soldProductsController.addProduct);

router.get("/mySoldProducts",sellerAuth, soldProductsController.mySoldProducts);
router.post("/allSellerAgricultureProductsByLocation",soldProductsController.totalAgricultureSoldProductsByLocation)
router.post("/allSellerDiaryProductsByLocation",soldProductsController.totalDiarySoldProductsByLocation)
router.post("/allSellerProteinProductsByLocation",soldProductsController.totalProteinSoldProductsByLocation)

router.patch("/editSoldProduct/:id",sellerAuth,soldProductsController.editSoldProduct)
router.delete("/deleteSoldProduct/:id",sellerAuth,soldProductsController.deleteSoldProduct)

module.exports = router;