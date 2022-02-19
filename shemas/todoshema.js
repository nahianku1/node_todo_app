let mongoose = require('mongoose');

let todoshema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['done','pending'],
        required:true,
    },
    date:{
        type:Date,
        default:new Date().getDate()
    }
})
module.exports =todoshema