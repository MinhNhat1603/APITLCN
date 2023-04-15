const mongoose = require('mongoose')
const orderSchema =new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    phone:{
        type: String,
        required: true
    },
    cart:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                unique
            },
            name:{
                type: String
            },
            price:{
                type: Number,
                min:0
            },
            quantity:{
                type: Number,
                min: 1
            },
            image:{
                type: String
            },
            slug:{
                type: String,
                sparse: true
            }
        }
    ],
    discount:{
        type: Number
    },
    address:{
        type: String
    },
    shipPrice:{
        type: Number
    },
    payment:{
        type: String
    },
    totalPrice:{
        type: Number,
        min: 0
    },
    voucher:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'voucher'
        }
    ],
    status:{
        type: Boolean,
        default: false
    }
},{timestamps: true}
)
module.exports = mongoose.model('order',orderSchema)