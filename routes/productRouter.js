const productController = require("../controller/productController");

const router =require("express").Router();

//ADD A PRODUCT
router.post ("/",productController.addProduct);

//GET ALL PRODUCT
router.get("/",productController.getAllProduct);

//GET A PRODUCT
router.get("/:id",productController.getAProduct);

//UPDATE PRODUCT
router.put("/:id",productController.updateProduct);

//DELETE PRODUCT
router.delete("/:id",productController.deleteProduct);
module.exports =router;