const category= require("../model/categoryModel");
const product = require("../model/productModel");
const brand = require("../model/brandModel");
const author = require("../model/authorsModel");

const  productController = {
    searchProduct:async (req, res)=>{
        try {
            const search = req.query.search;            
            const products = await product.find(
                { $text:{ $search: '\"' + search +'\"'} },
                {score: {$meta: 'textScore'}}
            ).populate("category").populate("brand").populate("author");
            // const authors =await authors.find(
            //     { $text:{ $search: '\"Brian L Weiss\"'} },
            //     {score: {$meta: 'textScore'}}
            // )
            // for( let i =0; i< author.length; i++){
            //     var productA= author[i].product;
            //     for(let j =0; j< productA.length;j++){
            //         const aProduct =await product.findById(productA[j]).populate("category").populate("brand").populate("author");
            //         products.push(aProduct);
            //     }
            // }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }

    },
}
module.exports =productController;