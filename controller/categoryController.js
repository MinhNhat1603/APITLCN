const category= require("../model/categoryModel");
const product = require("../model/productModel");

const categoryController = {
    //ADD category
    addCategory: async (req,res) => {
        // res.status(200).json(req.body)
        try {
            const newCategory =new category(req.body);
            const saveCategory = await newCategory.save();
            res.status(200).json(saveCategory);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL category
    getAllCategory: async (req,res) => {
        try {
            const categoryAll = await category.find();
            res.status(200).json(categoryAll);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A CATEGORY
     getACategory: async (req, res)=>{
        try {
            const aCategory =await category.findById(req.params.id).populate("products");
            res.status(200).json(aCategory);
        } catch (error) {
            res.status(500).json(err);
        }
    },

    //UPDATE CATEGORY
    updateCategory: async (req, res)=>{
        try {
            const Category =await category.findById(req.params.id);
            await Category.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(err);
        }
    },

    //DELETE CATEGORY
    deleteCategory: async (req, res)=>{
        try {
            await product.updateMany({category:req.params.id},{category: null});
            await category.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(err);
        }
    },
};

module.exports = categoryController;