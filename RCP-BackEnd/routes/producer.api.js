const router = require("express").Router();
const producerController = require("../app/controllers/producer.controller");
const producerAuth = require("../app/middleware/producer.Auth")
const upload = require("../app/middleware/file.upload");

router.post("/signUp", producerController.signUp);

router.post("/logIn", producerController.logIn);

router.get("/logOut",producerAuth, producerController.logOut);

router.get("/producerProfile",producerAuth, producerController.producerProfile);

router.post(
    "/producerProfile/producerLogo",
    producerAuth,
    upload.single("logo"),
    producerController.producerLogoUpload
  );
router.post("/producerProfile/producerDescription",producerAuth,producerController.addProducerDescription);
router.get("/logOutAll",producerAuth, producerController.logOutAll);


module.exports = router;