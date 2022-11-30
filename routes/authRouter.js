const authController = require("../controller/authController");

const router =require("express").Router();
//REGISTER
router.post ("/register",authController.registerUser);
//LOGIN
router.post ("/login",authController.loginUser);
//LOGOUT
//router.post ("/logout",)

module.exports =router;