const productController = require("../controller/s");

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

//GET PRODUCT BY SLUG
router.get("/slug/:slug",productController.getAProductbySlug);

//SEARCH
router.get("/search", productController.searchProduct);

module.exports =router;