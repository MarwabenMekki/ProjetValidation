// import mongoose module
const mongoose = require("mongoose");

// create course schema
const courseSchema = mongoose.Schema({
    name:String,
    description:String,
    duration: Number,
    img: String,

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    students: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        }
        ],
    
});

// create course model
const course= mongoose.model("Course",courseSchema);

// export course
module.exports= course;