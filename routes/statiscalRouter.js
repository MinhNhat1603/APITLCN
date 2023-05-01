const statiscal = require("../controller/statistical");
const router =require("express").Router();


router.get("/week", statiscal.statiscalWeek);

router.get("/month", statiscal.statiscalMonth);
module.exports =router;