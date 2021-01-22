const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rideId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment:{
        type:{
            String
        }
    }
},{
    timestamps:true
})

var Comments = mongoose.model('Comment',commentSchema)

module.exports = Comments;