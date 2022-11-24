const { default: mongoose } = require("mongoose");

const voucherSchema = new mongoose.Schema({
    amount:{
        type: 'Number',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
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
})
module.exports = mongoose.model('voucher',voucherSchema)