const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        userId: {
            type:String
        },
        userEmail: {
            type:String
        },
        title:{
            type:String,
            required:[true, 'title is required!']
        },
        description:{
            type:String,
            required:[true, 'description is required!']
        },
        isActive:{
            type:Boolean,
            default:true
        },

        comments:[]
    }
);


module.exports = mongoose.model("Todo", todoSchema);

