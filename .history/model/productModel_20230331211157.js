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
        type: Number,
        min:0,
        max:5
    },
    slug:{
        type: String, unique : true
    },
    sold:{
        type: Number
    }, 
    inventory:{
        type: Number
    }   
},
{timestamps: true}
)
productSchema
module.exports = mongoose.model('product',productSchema)