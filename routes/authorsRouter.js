const authorsController = require("../controller/authorsController");

const router =require("express").Router();

//ADD AUTHOR
router.post("/", authorsController.addAuthor);

//GET ALL AUTHOR
router.get("/", authorsController.getAllAuthor);

//GET AN AUTHOR
router.get("/:id",authorsController.getAnAuthor)

module.exports =  router;