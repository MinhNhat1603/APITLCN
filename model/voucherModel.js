const { default: mongoose } = require("mongoose");

const voucherSchema = new mongoose.Schema({
    amount:{
        type: 'Number',
        required: true
    },
    expiredDate:{
        type: Date,
        required: true
    },
    fromDate:{
        type: Date,
        required: true
    },
    status:{
        type: Boolean,
        default: true 
    },
    name:{
        type: String,
        required: true
    },
    type:{
        type: String
    },
    value:{
        type: String
    } 
},{timestamps: true}
)
module.exports = mongoose.model('voucher',voucherSchema)