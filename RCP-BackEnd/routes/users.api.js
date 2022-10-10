const router = require("express").Router();
const userController = require("../app/controllers/users.controller");


router.post("/signUp", userController.signUp);



module.exports = router;
