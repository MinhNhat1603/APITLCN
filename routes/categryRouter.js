const categoryController = require("../controller/categoryController");

const router =require("express").Router();

//ADD CATEGORY
router.post("/", categoryController.addCategory);

//GET ALL CATEGORY
router.get("/", categoryController.getAllCategory);

//GET ACATEGORY
router.get("/:id", categoryController.getACategory);

//UPDATE CATEGORY
router.put("/:id", categoryController.updateCategory);

//DELETE CATEGORY
router.delete("/:id", categoryController.deleteCategory);
module.exports =  router;