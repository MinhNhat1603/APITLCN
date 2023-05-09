const searchController = require("../controller/searchController");

const router =require("express").Router();


//SEARCH
router.get("/search", searchController.searchProduct);

module.exports =router;