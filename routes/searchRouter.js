const searchController = require("../controller/searchController");

const router =require("express").Router();


//SEARCH
router.get("/", searchController.searchProduct);

router.get("/name", searchController.searchByName);

router.get("/description", searchController.searchByDescription);

router.get("/author", searchController.searchByAuthor);

router.get("/filter", searchController.filter);

module.exports =router;