const category= require("../model/categoryModel");
const product = require("../model/productModel");
const brand = require("../model/brandModel");
const authors = require("../model/authorsModel");

const  productController = {
    //ADD A PRODUCT
    addProduct: async(req,res)=>{
        //res.status(200).json(req.body)
        try {
            const newProduct = new product(req.body);
            const saveProduct = await newProduct.save();
            if(req.body.author){
                const author = authors.findById(req.body.author)
                await author.updateOne({$push: {products: saveProduct._id}})
            }
            if(req.body.category){
                const Category = category.findById(req.body.category)
                await Category.updateOne({$push: {products: saveProduct._id}})
            }
            if(req.body.brand){
                const Brand = brand.findById(req.body.brand)
                await Brand.updateOne({$push: {products: saveProduct._id}})
            }
            res.status(200).json(saveProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //GET ALL PRODUCT
    getAllProduct: async(req,res)=>{
        try {
            const productdAll = await product.find().populate("category").populate("brand").populate("author");
            res.status(200).json(productdAll);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // getAllProduct: async(req,res)=>{
    //     try {
    //         const productdAll = await product.find();
    //         let i=0;
    //         while(i < productdAll.length){
    //             // product1[i] = productdAll[i];
    //             productdAll[i].inventory= 100;
    //             await productdAll[i].save();
    //             i++;
    //         }
    //         res.status(200).json(productdAll);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },
     //GET AN AUTHOR
    getAProduct: async (req, res)=>{
        try {
            const aProduct =await product.findById(req.params.id).populate("category").populate("brand").populate("author");
            res.status(200).json(aProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //UPDATE PRODUCT
    updateProduct: async (req, res)=>{
        try {
            const Product =await product.findById(req.params.id);
            await Product.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //DELETE PRODUCT
    deleteProduct: async (req, res)=>{
        try {
            await authors.updateMany(
                {products: req.params.id}, 
                {$pull:{products: req.params.id}}
                );
            await product.findByIdAndDelete(req.params.id);
            await category.updateMany(
                {products: req.params.id}, 
                {$pull:{products: req.params.id}}
                );
            await brand.updateMany(
                {products: req.params.id}, 
                {$pull:{products: req.params.id}}
                );
            await product.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAProductbySlug: async (req, res)=>{
        try {
            const aProduct =await product.findOne({"slug": req.params.slug}).populate("category").populate("brand").populate("author");
            res.status(200).json(aProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchProduct:async (req, res)=>{
        try {
            // product.createIndexes({'name' : 'text'});
            // var a = 'kiep'
            // const products = await product.find({ $text:{ $search: a}});
            const products = await product.find({ name : });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    },


};

module.exports =productController;