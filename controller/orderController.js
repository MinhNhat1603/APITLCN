const user = require("../model/userModel");
const order = require("../model/orderModel")
// const category= require("../model/categoryModel");
const Product = require("../model/productModel");
// const brand = require("../model/brandModel");
// const authors = require("../model/authorsModel");

const orderController = {
    //ADD ORDER
    addOrder: async(req,res)=>{
        try {
            var newOrder = new order(req.body);
            var cart = newOrder.cart;
            const saveOrder = await newOrder.save();
            if(req.body.userId){
                const aUser = user.findById(req.body.userId);
                await aUser.updateOne({$push: {orders: saveOrder._id}});
            }
            for(let i=0; i < cart.length; i++){
                // var product = await fetch("http://localhost:3000/product/"+ cart[i].productId, {method: 'POST'})
                // product = await product.json();
                // var inventory = parseInt(product.inventory) - parseInt(cart[i].quantity);
                // var sold = parseInt(product.sold) + parseInt(cart[i].quantity);
                // var results = await fetch("http://localhost:3000/product/"+ cart[i].productId, {method: 'PUT', headers: {"Content-Type": "application/json"},body: JSON.stringify({"inventory": inventory, "sold": sold})}) 
                const product =await Product.findById(cart[i].productId);
                //await Product.updateOne({$set: req.body});
                await product.updateOne( 
                    {
                        "$inc":{
                            "inventory": - cart[i].quantity,
                            "sold": cart[i].quantity
                        }
                    }
                );      
            }
            res.status(200).json("successfully!");
        } catch (error) { 
            res.status(500).json(error);
        }
    },
    //GET AN ORDER
    getAnOrder: async (req, res)=>{
        try {
            var Order =await order.findById(req.params.id); //.populate("category").populate("brand").populate("author").populate("product")
            //Order = Order.cart.populate("product");
            res.status(200).json(Order);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL ORDER
    getAllOrder: async(req,res)=>{
        try {
            const AllOrder = await order.find().sort({'createdAt': -1});
            res.status(200).json(AllOrder);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //UPDATE ORDER
    updateOrder: async (req, res)=>{
        try {
            const Order =await order.findById(req.params.id);
            await Order.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //DELETE ORDER
    deleteOrder: async (req, res)=>{
        try {
            await user.updateMany(
                {orders: req.params.id}, 
                {$pull:{orders: req.params.id}}
                );
            await order.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports =orderController;