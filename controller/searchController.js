const category= require("../model/categoryModel");
const product = require("../model/productModel");
const brand = require("../model/brandModel");
const author = require("../model/authorsModel");
const _ = require("lodash");
const  productController = {
    searchProduct:async (req, res)=>{
        try {
            const search = req.query.search;            
            const products = await product.find(
                { $text:{ $search: '\"' + search +'\"'} },
                {score: {$meta: 'textScore'}}
            ).populate("category").populate("brand").populate("author");
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }

    },
    searchByName: async (req, res)=>{
        try {
            const search = req.query.search;
            const products = await product.find().populate("category").populate("brand").populate("author");
            const result = products.filter((product) =>
                _.toLower(_.deburr(product.name)).includes(_.toLower(_.deburr(search))));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchByDescription: async (req, res)=>{
        try {
            const search = req.query.search;
            const products = await product.find().populate("category").populate("brand").populate("author");
            const result = products.filter((product) =>
                _.toLower(_.deburr(product.description)).includes(_.toLower(_.deburr(search))));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchByAuthor: async (req, res)=>{
        try {
            const search = req.query.search;
            const products = await product.find().populate("category").populate("brand").populate("author");
            const result = products.filter((product) =>
                _.toLower(_.deburr(product.author.name)).includes(_.toLower(_.deburr(search))));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports =productController;