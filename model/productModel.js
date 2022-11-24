const mongoose = require('mongoose')
const productSchema =new mongoose.Schema({
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors'
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand'
    },
    description:{
        type: String
    },
    images:[
        {
            type: String
        }
    ],
    options:[
        {
            type: String
        }
    ],
    discount:{
        type: Number,
        default: 0
    },
    image:{
        type:String
    },
    name:{
        type:String
    },
    price:{
        type: Number
    },
    rate:{
        type: Number
    },
    slug:{
        type: String
    },
    sold:{
        type: Number
    }   
})
module.exports = mongoose.model('product',productSchema)