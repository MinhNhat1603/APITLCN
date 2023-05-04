const statiscal = require("../controller/statistical");
const router =require("express").Router();


router.post("/week", statiscal.statiscalWeek);

router.post("/month", statiscal.statiscalMonth);
module.exports =router;