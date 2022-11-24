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
    getAllProduct: async(req,res)=>{
        try {
            const productdAll = await product.find();
            res.status(200).json(productdAll);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports =productController;