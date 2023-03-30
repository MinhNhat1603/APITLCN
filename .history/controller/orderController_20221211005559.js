const user = require("../model/userModel");
const order = require("../model/orderModel")

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
            res.status(200).json(saveOrder);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET AN ORDER
    getAnOrder: async (req, res)=>{
        try {
            const Order =await order.findById(req.params.id);
            res.status(200).json(Order);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL ORDER
    getAllOrder: async(req,res)=>{
        try {
            const AllOrder = await order.find();
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
            res.status(500).json(err);
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
            res.status(500).json(err);
        }
    }
}
module.exports =orderController;