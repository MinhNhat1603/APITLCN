const addressController = require("../controller/addressController");
const router =require("express").Router();
router.get("/", addressController.code);

module.exports =  router;