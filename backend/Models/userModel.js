const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name :{type:String, default:"guest"},
    email :{type:String, required:[true, "email is required"], unique:true},
    password : {type:String, required:[true, "password is required"]},
    admin : {type:Boolean, default:false}
});

module.exports = new mongoose.model("users", userSchema);