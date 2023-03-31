const category= require("../model/categoryModel");
const product = require("../model/productModel");
const brand = require("../model/brandModel");
const authors = require("../model/authorsModel");

const  productController = {
    searchProduct:async (req, res)=>{
        try {
            // product.createIndexes({'name' : 'text'});
            // var a = 'kiep'
            // const products = await product.find({ $text:{ $search: a}});
            const products = await product.find({ name : /kiep/});
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