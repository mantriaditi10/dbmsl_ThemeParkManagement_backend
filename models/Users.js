const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =new Schema({
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        fname:{
            type:String
        },
        lname:{
            type:String
        }     
    },
    mobileNo:{
        type:Number
    },
    address:{
        city:{
            type:String
        },
        state:{
            type:String
        },
        country:{
            type:String
        }
    }
})

var Users = mongoose.model('User',userSchema)

module.exports=Users;