const addressController = require("../controller/addressController");
const router =require("express").Router();
router.pos("/", addressController.code);

module.exports =  router;