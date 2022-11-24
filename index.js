const express = require("express");
const cors = require("cors");
const app = express();
const mongoose =require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const authorsRoute = require("./routes/authorsRouter");
const categoryRoute = require("./routes/categryRouter");
const brandRoute = require("./routes/brandRouter");
const productRoute = require("./routes/productRouter");
mongoose.connect('mongodb+srv://minhnhat:nhat123@tlcn.e1fkcts.mongodb.net/?retryWrites=true&w=majority',()=>{
    console.log("Connected to MongoDB")
})

app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

//ROUTES
app.use("/author", authorsRoute);
app.use("/category", categoryRoute);
app.use("/brand", brandRoute);
app.use("/product",productRoute);

app.get("/api",(req,res)=>{
    res.status(200).json('hello');
})
app. listen(5000,()=>{
    console.log("Server running.")
});