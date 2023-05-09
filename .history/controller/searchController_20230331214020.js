const category= require("../model/categoryModel");
const product = require("../model/productModel");
const brand = require("../model/brandModel");
const authors = require("../model/authorsModel");

const  productController = {
    searchProduct:async (req, res)=>{
        try {
            //const products = await product.find({ name : /Kiếp/});
            const search = req.body.name;
            
            const products = await product.find(
                { $text:{ $search: '\"'Kiếp Nào Ta\"'} },
                {score: {$meta: 'textScore'}}
            );
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }

    },
}
module.exports =productController;