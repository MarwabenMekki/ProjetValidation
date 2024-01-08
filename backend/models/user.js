// import mongoose module
const mongoose = require("mongoose");

// create user schema
const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email: String,
    telephone: Number,
    adress: String,
    speciality: String,
    childPhone: Number,
    password: String,
    role: String,
    avatar: String,
    file: String,
    img:String,
    status:String,

    
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }    
});

// create user model
const user= mongoose.model("User",userSchema);

// export user
module.exports= user;