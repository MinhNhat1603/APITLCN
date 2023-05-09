const brand = require("../model/brandModel");
const product = require("../model/productModel");

const brandController = {
    //ADD BRAND
    addBrand: async (req,res) => {
        // res.status(200).json(req.body)
        try {
            const newBrand =new brand(req.body);
            const saveBrand = await newBrand.save();
            res.status(200).json(saveBrand);
        }catch(error) {
            res.status(500).json(error);
        }
    },
    //GET ALL BRAND
    getAllBrand: async (req,res) => {
        try {
            const brandAll = await brand.find();
            res.status(200).json(brandAll);
        } catch (error) {
            res.status(500).json(err);
        }
    },
     //GET AN BRAND
     getABrand: async (req, res)=>{
        try {
            const aBrand =await brand.findById(req.params.id).populate("products");
            res.status(200).json(aBrand);
        } catch (error) {
            res.status(500).json(err);
        }
    },

    //UPDATE BRAND
    updateBrand: async (req, res)=>{
        try {
            const Brand =await brand.findById(req.params.id);
            await Brand.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(err);
        }
    },

    //DELETE BRAND
    deleteBrand: async (req, res)=>{
        try {
            await product.updateMany({brand:req.params.id},{brand: null});
            await brand.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(err);
        }
    },
};

module.exports = brandController;