const { default: mongoose } = require("mongoose");

const voucherSchema = new mongoose.Schema({
    amount:{
        type: 'Number',
        required: true
    },
    createdAt:{
        type: Date,
        required:true
    },
    expiredDate:{
        type: Date,
        required: true
    },
    fromDate:{
        type: Date,
        required: true
    },
    id:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required:true,
        default: true 
    },
    name:{
        type: Date,
        required: true
    },
    type:{},
    value:{} 
})
module.exports = mongoose.model('voucher',voucherSchema)