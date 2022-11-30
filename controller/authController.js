const user = require("../model/userModel");
const jwt = require("jsonwebtoken");

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
                res.status(404).json("Wrong phone");
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
                res.status(200).json({...others,accessToken});      
            }
            else{
                res.status(404).json("Wrong password");
            }      
        } catch (error) {
            res.status(500).json(errors);
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
    
    
}
module.exports = authController;