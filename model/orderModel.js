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
                ref: 'product'
            },
            quantity:{
                type: Number,
                min: 1
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
    total:{
        type: Number,
        min: 0
    },
    voucher:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'voucher'
        }
    ]
},{timestamps: true}
)
module.exports = mongoose.model('order',orderSchema)