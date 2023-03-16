const addressController = require("../controller/addressController");
const router =require("express").Router();
router.get("/", addressController)

module.exports =  router;