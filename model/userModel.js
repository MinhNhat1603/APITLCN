const { default: mongoose } = require("mongoose");

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
        facebook:{
            type: String
        },
        google:{
            type: String
        },
        images:{
            type: String
        }
    },
    role:{
        type: String,
        required: true,
        default:'user'
    },
    status:{
        type: Boolean,
        default: true 
    }
})
module.exports =mongoose.model('user',userSchema)