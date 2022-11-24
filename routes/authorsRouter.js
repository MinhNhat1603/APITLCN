const authorsController = require("../controller/authorsController");

const router =require("express").Router();

//ADD AUTHOR
router.post("/", authorsController.addAuthor);

//GET ALL AUTHOR
router.get("/", authorsController.getAllAuthor);

//GET AN AUTHOR
router.get("/:id",authorsController.getAnAuthor);

//UPDATE AUTHOR
router.put("/:id",authorsController.updateAuthor);

//DELETE AUTHOR
router.delete("/:id",authorsController.deleteAuthor);

module.exports =  router;