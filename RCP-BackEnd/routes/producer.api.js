const router = require("express").Router();
const producerController = require("../app/controllers/producer.controller");
const upload = require("../app/middleware/file.upload");
const UserController = require("../app/controllers/user.controller");
const userAuth = require("../app/middleware/userAuth");

router.post("/signUp", producerController.signUp);

router.post("/logIn", UserController.logIn);

router.get("/logOut", userAuth, UserController.logOut);

router.get("/producerProfile", userAuth, producerController.producerProfile);

router.post(
  "/producerProfile/producerLogo",
  userAuth,
  upload.single("logo"),
  producerController.producerLogoUpload
);
router.post("/producerProfile/producerDescription", userAuth, producerController.addProducerDescription);
router.get("/logOutAll", userAuth, UserController.logOutAll);


module.exports = router;