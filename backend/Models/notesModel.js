const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title : {type:String, default:"Untitled"},
    content:{type:String, default:"empty"},
    user : {type:mongoose.Schema.Types.ObjectId, required:[true, "user is required"], ref:"users"},
    createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model("notes", notesSchema);