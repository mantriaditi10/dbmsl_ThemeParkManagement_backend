const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    restId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    dishName:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    featured:{
        type:Boolean
    }

})

var Dishes = mongoose.model('Dish',dishSchema)

module.exports=Dishes;