const { default: mongoose } = require("mongoose");
const { bool } = require("prop-types");
const userProfileSchema =new mongoose.Schema({
    name:{
        type: String
    },
    nickname:{
        type: String
    },
    birth:{
        type: Date
    },
    sex:{
        type: String
    },
    National:{
        type: String
    },
    email:{
        type: String
    },
    facabook:{
        type: String
    },
    google:{
        type: String
    }
    images:{
        type: String
    }
})
const userSchema = new mongoose.Schema({
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userProfile:{
        type: [userProfileSchema],
        default: undefined
    },
    role:{
        type: String,
        required: true,
        default:'user'
    },
    status:{
        type: Boolean,
        required:true,
        default: true 
    }
})
module.exports =mongoose.model('users',userSchema)