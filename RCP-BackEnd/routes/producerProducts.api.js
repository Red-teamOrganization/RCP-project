const router = require("express").Router();
const producerProductsController = require("../app/controllers/producerProducts.controller");
const producerAuth = require("../app/middleware/producer.Auth")

router.post("/addProducedProduct",producerAuth, producerProductsController.addProduct);

router.get("/myProducedProducts",producerAuth, producerProductsController.myProducedProducts);
router.post("/allProducerAgricultureProductsByLocation",producerProductsController.totalAgricultureProducedProductsByLocation)
router.post("/allProducerDiaryProductsByLocation",producerProductsController.totalDiaryProducedProductsByLocation)
router.post("/allProducerProteinProductsByLocation",producerProductsController.totalProteinProducedProductsByLocation)

router.patch("/editProducedProduct/:id",producerAuth,producerProductsController.editProducedProduct)
router.delete("/deleteProducedProduct/:id",producerAuth,producerProductsController.deleteProducedProduct)

module.exports = router;