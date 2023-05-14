const jwt = require("jsonwebtoken");
const { model } = require("mongoose");


const middlewareController={
    //VERiFYTOKEN
    verifyToken:(req,res,next)=>{
        const token= req.headers.token;
        if(token){
            //Bearer token
            const accessToken =token.split(" ")[1];
            jwt.verify(accessToken,"tieuluan",(error,user)=>{
                if(error){
                    res.status(403).json("Token is not valid")
                }
                req.user= user;
                next();
            });
        }else{
            res.status(401).json("you are not authenticated")
        }
    },
    verifyTokenAndAdmin:(req,res,next)=>{
        middlewareController.verifyToken(req,res,()=>{
            if(req.user.id == req.params.id || req.user.role =="admin"){
                next();
            }else{
                res.status(403).json("you are not allowed")
            }  
        });
    }
}
module.exports =middlewareController;