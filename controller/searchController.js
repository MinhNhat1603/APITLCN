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
    },
    filter: async (req, res)=>{
        try {
            const AnAuthor = req.query.author;
            const ACategory = req.query.category;
            
            const products = await product.find().populate("category").populate("brand").populate("author");
            const anAuthor = await author.findById(AnAuthor);
            const aCategory = await category.findById(ACategory);
            const Author = anAuthor.products;
            const Category = aCategory.products;
            let result = Author.filter(Element => Category.includes(Element));
            var Result = [];
            for(let i =0; i< result.length; i++){
                const aProduct =await product.findById(result[i]).populate("category").populate("brand").populate("author");
                Result.push(aProduct);
            }
            res.status(200).json(Result);
        } catch (error) {
            res.status(500).json(error);
        }
    },
}
module.exports =productController;