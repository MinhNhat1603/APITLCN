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
            const aBrand =await brand.findById(req.params.id);
            res.status(200).json(aBrand);
        } catch (error) {
            res.status(500).json(err);
        }
    }
};

module.exports = brandController;