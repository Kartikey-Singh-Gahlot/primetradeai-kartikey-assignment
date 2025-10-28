const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name :{type:String, default:["guest"]},
    email :{type:String, required:[true, "email is required"]},
    password : {type:String, required:[true, "password is required"]},
    admin : {type:Boolean, default:false}
})




const userModel  = new mongoose.model(userSchema, "users");

module.exports = {userModel};