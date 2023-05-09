const brandController = require("../controller/brandController");
const router =require("express").Router();

//ADD BRAND
router.post("/", brandController.addBrand);

//GET ALL BRAND
router.get("/", brandController.getAllBrand);

//GET A BRAND
router.get("/:id", brandController.getABrand);

//UPDATE BRAND
router.put("/:id", brandController.updateBrand);

//DELETE BRAND
router.delete("/:id", brandController.deleteBrand);

module.exports =  router;