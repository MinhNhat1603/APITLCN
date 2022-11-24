const categoryController = require("../controller/categoryController");

const router =require("express").Router();

//ADD CATEGORY
router.post("/", categoryController.addCategory);

//GET ALL CATEGORY
router.get("/", categoryController.getAllCategory);


module.exports =  router;