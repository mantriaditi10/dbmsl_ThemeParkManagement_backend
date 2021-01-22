const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema =new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    noOfPeople:{
        adults:{
            type:Number
        },
        children:{
            type:Number
        }
    },
    ticketType:{
        type:String
    },
    dateOfVisit:{
        type:Date
    },
    amount:{
        type:Number
    }
})

var Tickets = mongoose.model('Ticket',ticketSchema)

module.exports=Tickets;