const orderController = require("../controller/orderController");

const router =require("express").Router();

//ADD CATEGORY
router.post("/", orderController.addOrder);
//GET ALL ORDER
router.get("/", orderController.getAllOrder);
//GET AN ORDER
router.get("/:id",orderController.getAnOrder);
//UPDATE
router.put("/:id", orderController.updateOrder);
//DELETE
router.delete("/:id",orderController.deleteOrder);

module.exports =  router;