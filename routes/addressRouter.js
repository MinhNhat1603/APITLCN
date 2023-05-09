const addressController = require("../controller/addressController");
const router =require("express").Router();
//TỈNH
router.get("/Province", addressController.codeProvince);
//QUẬN HUYỆN
router.get("/District", addressController.codeDistrict);
//Xã Phường
router.get("/Ward", addressController.codeWard);
//Phi Van chuyen
router.get("/FeeShip", addressController.getFeeShip);
router.get("/code", addressController.code);

module.exports =  router;