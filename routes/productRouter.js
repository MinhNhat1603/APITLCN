const productController = require("../controller/productController");

const router =require("express").Router();

//ADD A PRODUCT
router.post ("/",productController.addProduct);

//GET ALL PRODUCT
router.get("/",productController.getAllProduct);

module.exports =router;