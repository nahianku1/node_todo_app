let mongoose = require('mongoose');

let todoshema=mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:['done','pending'],
    },
    date:{
        type:Date,
        default:new Date().toUTCString(),
    }
})
module.exports =todoshema