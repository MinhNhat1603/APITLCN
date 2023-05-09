const category= require("../model/categoryModel");
const product = require("../model/productModel");
const brand = require("../model/brandModel");
const authors = require("../model/authorsModel");

const  productController = {
    searchProduct:async (req, res)=>{
        try {
            //const products = await product.find({ name : /Kiếp/});
            const search = req.body.search;
            // const data = search ? {
            //     "$or": [
            //         {name: {$regex: search, $options: "$i"}},
            //         {description: {$regex: search, $options: "$i"}}
            //     ]
            // } : {}
            var data = {
                name
            }
            const products = await product.find(data);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }

    },
}
module.exports =productController;