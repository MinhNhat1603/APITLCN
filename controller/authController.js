const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { Vonage } = require('@vonage/server-sdk');
const accountSid = 'AC950563cf5a2813f1eb2f50a3692e7f33';
const authToken = '50436d07dc3d397e5e548943dea6a1fc';
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const key = 'tieuluan';

const authController = {
    //REGISTER
    registerUser: async (req, res)=>{
        try {
            const newUser =await new user({
                phone: req.body.phone,
                userProfile:{
                    email: req.body.email
                },
                password: req.body.password
            });
            const saveuser = await newUser.save();
            res.status(200).json(saveuser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    //LOGIN
    loginUser:async (req, res)=>{
        try {
            const auser =await user.findOne({phone: req.body.phone});
            const apass= req.body.password;
            if(!auser){
                return res.status(404).json("Wrong phone");
            }
            if(apass === auser.password && auser){ 
                const accessToken = jwt.sign({
                    id: auser.id,
                    phone: auser.phone,
                    role: auser.role
                },
                "tieuluan", 
                {expiresIn:"24h"}
                );
                const {password,...others}=auser._doc;
                return res.status(200).json({...others,accessToken});      
            }
            else{
                return res.status(404).json("Wrong password");
            }      
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    logoutUser:async (req, res)=>{
        try {
            req.session.destroy();
            res.status(200).json("logout!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    sentOTP: async(req,res)=>{
        const email = req.body.email;
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const mailOptions = {
            from: 'vuminhnhat1603@gmail.com', // Địa chỉ email của bạn
            to: email, // Địa chỉ email người nhận
            subject: 'Mã OTP',
            text: `Mã OTP của bạn là: ${OTP}`
          };
        const allUser = await user.find();
        const filteredUsers = allUser.filter(user => user.userProfile.email === email);
        const hashedOTP = hashOTP(OTP, key)
        var aUser =filteredUsers[0];
        if (!aUser) {
            res.status(404).json("email không tồn tại");
        }
        const idUser = aUser.id;
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.status(500).json(error);
            } else {
                res.status(200).json({'idUser': idUser, 'hashedOTP': hashedOTP});
            }
        });
    },
    compareOTP: async(req,res)=>{
        const idUser =req.body.idUser;
        const hashedOTP = req.body.hashedOTP;
        const OTP = req.body.OTP;
        const compareData = OTP + key;
        const isMatch = bcrypt.compareSync(compareData, hashedOTP);
        if(isMatch){
            res.status(200).json(idUser)
        }else{
            res.status(400).json("Mã không hợp lệ")
        }
    }    
}
module.exports = authController;

// Tạo một transporter sử dụng SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Sử dụng kết nối bảo mật SSL/TLS
    auth: {
      user: 'vuminhnhat1603@gmail.com', // Địa chỉ email của bạn
      pass: 'cojtigdpohogdetp' // Mật khẩu email của bạn
    }
});

const hashOTP = (OTP, key) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedOTP = bcrypt.hashSync(OTP + key, salt);
    return hashedOTP;
};
