// import mongoose module
const { stripExtension } = require("@angular/compiler-cli/src/ngtsc/file_system/src/util");
const mongoose = require("mongoose");

// create user schema
const noteSchema = mongoose.Schema({
    value:String,
    evaluation: String,
    
});
// create user model
const note= mongoose.model("Note",noteSchema);

// export user
module.exports= note;