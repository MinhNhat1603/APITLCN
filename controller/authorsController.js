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
            const anAuthor =await authors.findById(req.params.id);
            res.status(200).json(anAuthor);
        } catch (error) {
            res.status(500).json(err);
        }
    }
};

module.exports = authorsController;