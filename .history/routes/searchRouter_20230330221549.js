const searchController = require("../controller/searchController");

const router =require("express").Router();


//SEARCH
router.get("/search", productController.searchProduct);

module.exports =router;