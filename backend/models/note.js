// import mongoose module
const mongoose = require("mongoose");

// create user schema
const noteSchema = mongoose.Schema({
    value:String,
    evaluation: String,

    student: 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },

    course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
    
});
// create user model
const note= mongoose.model("Note",noteSchema);

// export user
module.exports= note;