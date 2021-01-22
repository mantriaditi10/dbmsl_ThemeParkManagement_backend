const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    info:{
        type:String
    },
    rideType:{
        type:String
    },
    capacity:{
        type:Number
    },
    ageLimit:{
        type:Number
    },
    imgSRC:{
        type:String
    },
    featured:{
        type:Boolean
    },
    rideRestriction:{
        type:String
    }

})

var Rides = mongoose.model('Ride',rideSchema)

module.exports=Rides;
