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
     getAnAuthor: async (req, res)=>{
        try {
            const aCategory =await category.findById(req.params.id);
            res.status(200).json(aCategory);
        } catch (error) {
            res.status(500).json(err);
        }
    }
};

module.exports = categoryController;