const addressController = require("../controller/addressController");
const router =require("express").Router();
router.post("/", addressController.code);

module.exports =  router;