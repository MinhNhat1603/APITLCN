const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ]
})
module.exports = mongoose.model('category',categorySchema)