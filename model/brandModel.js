const mongoose = require('mongoose')
const brandSchema = new mongoose.Schema({
    addressDetails:{
        type: String,
    },
    commune:{
        type: String,
    },
    country:{
        type: String,
    },
    description:{
        type: String,
    },
    district:{
        type: String,
    },
    img:{
        type: String,
    },
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
    },
    province:{
        type: String,
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ]
})
module.exports = mongoose.model('brand',brandSchema)