const brandController = require("../controller/brandController");
const router =require("express").Router();

//ADD CATEGORY
router.post("/", brandController.addBrand);

//GET ALL CATEGORY
router.get("/", brandController.getAllBrand);


module.exports =  router;