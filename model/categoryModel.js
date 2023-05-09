const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ]
})
module.exports = mongoose.model('category',categorySchema)