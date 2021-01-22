const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restoSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    cuisine:{
        type:String
    },
    table:{
        total:{
            type:Number
        },
        booked:{
            type:Number
        }
    },
    service:[{
        type:String
    }],
    timings:{
        type:String
    },
    imgSRC:{
        type:String
    },
    specials:{
        type:String
    }

})

var Dishes = mongoose.model('Restaurant',restoSchema)

module.exports=Dishes;