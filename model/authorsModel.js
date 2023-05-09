const { default: mongoose } = require("mongoose");

const authorsSchema = mongoose.Schema({
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
module.exports = mongoose.model('authors',authorsSchema)