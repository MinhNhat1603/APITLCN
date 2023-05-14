const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
const speakeasy = require('speakeasy');
const { Vonage } = require('@vonage/server-sdk');
const accountSid = 'AC950563cf5a2813f1eb2f50a3692e7f33';
const authToken = '50436d07dc3d397e5e548943dea6a1fc';
const client = require('twilio')(accountSid, authToken);

const authController = {
    //REGISTER
    registerUser: async (req, res)=>{
        try {
            const newUser =await new user({
                phone: req.body.phone,
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
    sendOTP: (req,res,next)=>{
        // const vonage = new Vonage({
        //     apiKey: 'f572f9ca',
        //     apiSecret: '0rn2ZnFHrELHbp6P'
        //   },{debug: true});
        // const secret = speakeasy.generateSecret({ length: 20 });
        // vonage.message.sendSms("84929370453","84868815325", req.body.message, {type: 'unicode'}, (err, responseData) => {if (responseData) {res.status(200).json(responseData)}});
        client.messages
            .create({
                body: 'Hello there!',
                from: '+84929370453',
                to: '+84868815325'
            })
            .then(message => res.status(200).json(message.sid));
    }
    
    
}
module.exports = authController;