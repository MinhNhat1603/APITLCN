const voucherController = require("../controller/voucherController");

const router =require("express").Router();

//ADD A VOUCHER
router.post ("/",voucherController.addVoucher);

//GET ALL VOUCHER
router.get("/",voucherController.getAllVoucher);

//GET A VOUCHER
router.get("/:id",voucherController.getAVoucher);

//UPDATE VOUCHER
router.put("/:id",voucherController.updateVoucher);

//DELETE VOUCHER
router.delete("/:id",voucherController.deleteVoucher);
module.exports =router;