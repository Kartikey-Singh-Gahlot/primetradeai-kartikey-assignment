const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title : {type:String, default:"Untitled"},
    content:{type:String, default:"empty"}
});

module.exports = new mongoose.Model("notes", notesSchema)