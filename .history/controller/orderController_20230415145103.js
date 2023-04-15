const user = require("../model/userModel");
const order = require("../model/orderModel")
// const category= require("../model/categoryModel");
// const product = require("../model/productModel");
// const brand = require("../model/brandModel");
// const authors = require("../model/authorsModel");

const orderController = {
    //ADD ORDER
    addOrder: async(req,res)=>{
        try {
            const newOrder = new order(req.body);
            const saveOrder = await newOrder.save();
            if(req.body.userId){
                const aUser = user.findById(req.body.userId)
                await aUser.updateOne({$push: {orders: saveOrder._id}})
            }
            var cart = saveOrder.cart;
            for(let i=0; i < cart.length; i++){
                var product = await fetch("http://localhost:3000/product/"+ cart[i].productId, {method: 'GET'} )
                var inventory = product.inventory - cart[i].quantity;
                var sold = product.sold + cart[i].quantity;
                var results = await fetch("http://localhost:3000/product/"+ cart[i].productId, {method: 'PUT', body: JSON.stringify({"inventory": inventory, "sold": sold})}) 
                if(results== null){
                    res.status(500).json("Lỗi");
                }            
            }
            var product = await fetch("http://localhost:3000/product/638080c4c20e8937f190efd6", {method: 'POST', headers: {"Content-Type": "application/json"}})
            res.status(200).json(sac);
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