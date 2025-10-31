const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name :{type:String, default:"guest"},
    email :{type:String, required:[true, "email is required"], unique:true},
    password : {type:String, required:[true, "password is required"]},
    notes : {type:[mongoose.Schema.Types.ObjectId], ref:"notes", default:[]},
    admin : {type:Boolean, default:false}
});

module.exports = mongoose.model("users", userSchema);