const searchController = require("../controller/searchController");

const router =require("express").Router();


//SEARCH
router.get("/", searchController.searchProduct);

router.get("/name", searchController.searchByName);

router.get("/description", searchController.searchByDescription);

router.get("/author", searchController.searchByAuthor);

module.exports =router;