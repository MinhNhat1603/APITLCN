const authors = require("../model/authorsModel");
const product = require("../model/productModel");

const authorsController = {
    //ADD AUTHOR
    addAuthor: async (req,res) => {
        // res.status(200).json(req.body)
        try {
            const newAuthor =new authors(req.body);
            const saveAuthor = await newAuthor.save();
            res.status(200).json(saveAuthor);
        } catch (error) {
            res.status(500).json(err);
        }
    },
    //GET ALL AUTHOR
    getAllAuthor: async (req,res) => {
        try {
            const authorsAll = await authors.find();
            res.status(200).json(authorsAll);
        } catch (error) {
            res.status(500).json(err);
        }
    },

    //GET AN AUTHOR
    getAnAuthor: async (req, res)=>{
        try {
            const anAuthor =await authors.findById(req.params.id).populate("products");
            res.status(200).json(anAuthor);
        } catch (error) {
            res.status(500).json(err);
        }
    },

    //UPDATE AUTHOR
    updateAuthor: async (req, res)=>{
        try {
            const Author =await authors.findById(req.params.id).populate("products");
            await Author.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(err);
        }
    },

    //DELETE AUTHOR
    deleteAuthor: async (req, res)=>{
        try {
            await product.updateMany({author:req.params.id},{author: null});
            await authors.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(err);
        }
    },

};

module.exports = authorsController;