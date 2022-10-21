const router = require("express").Router();
const producerController = require("../app/controllers/producer.controller");
const upload = require("../app/middleware/file.upload");
const userAuth = require("../app/middleware/userAuth");

router.post("/signUp", producerController.signUp);

router.get("/producerProfile", userAuth, producerController.producerProfile);

router.post(
  "/producerProfile/producerLogo",
  userAuth,
  upload.single("logo"),
  producerController.producerLogoUpload
);
router.post("/producerProfile/producerDescription", userAuth, producerController.addProducerDescription);



module.exports = router;