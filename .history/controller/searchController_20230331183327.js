const category= require("../model/categoryModel");
const product = require("../model/productModel");
const brand = require("../model/brandModel");
const authors = require("../model/authorsModel");

const  productController = {
    searchProduct:async (req, res)=>{
        try {
            //const products = await product.find({ name : /Kiếp/});
            const search = req.body.search;
            const product = search ? {
                "$or": [
                    {name: {$regex: search, $options: "$i"}},
                    {description: {$regex: search, $options: "$i"}}
                ]
            } : {}
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
        // try {
        //     const productdAll = await product.find().populate("category").populate("brand").populate("author");
        //     res.status(200).json(productdAll);
        // } catch (error) {
        //     res.status(500).json(error);
        // }
    },
}
module.exports =productController;