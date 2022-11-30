const express = require("express");
const cors = require("cors");
const app = express();
const mongoose =require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authorsRoute = require("./routes/authorsRouter");
const categoryRoute = require("./routes/categryRouter");
const brandRoute = require("./routes/brandRouter");
const productRoute = require("./routes/productRouter");
const voucherRoute = require("./routes/voucherRouter");
const userRoute = require("./routes/userRouter");
const authRoute = require("./routes/authRouter");
const orderRoute = require("./routes/orderRouter");

app.use(cors({credentials: true, origin: true}));
mongoose.connect('mongodb+srv://minhnhat:nhat123@tlcn.e1fkcts.mongodb.net/?retryWrites=true&w=majority',()=>{
    console.log("Connected to MongoDB")
})
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({limit:"50mb"}));
app.use(morgan("common"));

//ROUTES
app.use("/author", authorsRoute);
app.use("/category", categoryRoute);
app.use("/brand", brandRoute);
app.use("/product", productRoute);
app.use("/voucher", voucherRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/order", orderRoute)
// app.use(session({
//     secret: "dfjalksfjalkasdsa",
//     saveUninitialized: true,
//     resave:true
// }));    

app. listen(3000,()=>{
    console.log("Server running.")
});

//JWT

