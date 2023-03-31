const searchController = require("../controller/searchController");

const router =require("express").Router();


//SEARCH
router.get("/", searchController.searchProduct);

module.exports =router;