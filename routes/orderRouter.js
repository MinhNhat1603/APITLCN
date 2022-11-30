const orderController = require("../controller/orderController");

const router =require("express").Router();

//ADD CATEGORY
router.post("/", orderController.addOrder);
//GET ALL ORDER
router.get("/",orderController.getAllOrder);
//GET AN ORDER
router.get("/:id",orderController.getAnOrder);



module.exports =  router;