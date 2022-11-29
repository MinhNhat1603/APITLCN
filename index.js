const express = require("express");
const cors = require("cors");
const app = express();
const mongoose =require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const authorsRoute = require("./routes/authorsRouter");
const categoryRoute = require("./routes/categryRouter");
const brandRoute = require("./routes/brandRouter");
const productRoute = require("./routes/productRouter");
const voucherRoute = require("./routes/voucherRouter");
const userRoute = require("./routes/userRouter");
const authRoute = require("./routes/authRouter");
app.use(cors({credentials: true, origin: true}));
mongoose.connect('mongodb+srv://minhnhat:nhat123@tlcn.e1fkcts.mongodb.net/?retryWrites=true&w=majority',()=>{
    console.log("Connected to MongoDB")
})

app.use(bodyParser.json({limit:"50mb"}));
app.use(morgan("common"));

//ROUTES
app.use("/author", authorsRoute);
app.use("/category", categoryRoute);
app.use("/brand", brandRoute);
app.use("/product",productRoute);
app.use("/voucher",voucherRoute);
app.use("/user",userRoute);
app.use("/auth",authRoute);

// app.get('/set_session', (req, res) => {
//     //set a object to session
//     req.session.User = {
//         website: 'anonystick.com',
//         type: 'blog javascript',
//         like: '4550'
//     }

//     return res.status(200).json({status: 'success'})
// })
app.use(session({
    secret: "dfjalksfjalkasdsa",
    saveUninitialized: true,
    resave:true
}));    

app. listen(3000,()=>{
    console.log("Server running.")
});