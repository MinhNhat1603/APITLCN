const voucher = require("../model/voucherModel");

const voucherController = {
    //ADD VOUCHER
    addVoucher: async (req,res) => {
        // res.status(200).json(req.body)
        try {
            const newVoucher =new voucher(req.body);
            const saveVoucher = await newVoucher.save();
            res.status(200).json(saveVoucher);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL VOUCHER
    getAllVoucher: async (req,res) => {
        try {
            const voucherAll = await voucher.find();
            res.status(200).json(voucherAll);
        } catch (error) {
            res.status(500).json(error);
        }
    },
     //GET A VOUCHER
     getAVoucher: async (req, res)=>{
        try {
            const aVoucher =await voucher.findById(req.params.id);
            res.status(200).json(aVoucher);
        } catch (error) {
            res.status(500).json(err);
        }
    },

    //UPDATE VOUCHER
    updateVoucher: async (req, res)=>{
        try {
            const Voucher =await voucher.findById(req.params.id);
            await Voucher.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(err);
        }
    },

    //DELETE VOUCHER
    deleteVoucher: async (req, res)=>{
        try {
            await voucher.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(err);
        }
    },
};

module.exports = voucherController;