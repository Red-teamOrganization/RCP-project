const router = require("express").Router();
const homeController = require("../app/controllers/home.controller");

router.get("/honorList", homeController.honorList);
router.get("/allCharities", homeController.allCharities);

router.get("/allStatics",homeController.allStatics);

router.get("/totalMarketInsights",homeController.totalMarketInsights)


module.exports = router;