const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const signup = async (req, res)=>{
   const {name, email, password, adminKey } = req.body;
   const admin = ((adminKey) && (adminKey==process.env.ADMINKEY))? true:false;
   try{
     const salt = await bcrypt.genSalt();
     const hashedPassword = await bcrypt.hash(password,salt);
     const user = new userModel({name, email, hashedPassword, admin })
     await user.save();
     const token = jwt.sign({email, admin}, process.env.SECRETKEY);
     const cookieDetails = {
       httpOnly : true,
       secure: true,
       sameSite : "None",
       maxAge : 7*24*60*60*1000
     }
     res.cookie("token",token, cookieDetails);
     res.status(200).json({
      status : true,
      body : "SignUp Successfull"
     })
   }
   catch(err){
     res.status(500).json({
      status : false,
      body : `Error : ${err}`
     })
   }
}

const signin = async (req, res)=>{
  const {email, password} = req.body;
  try{
    const user = await userModel.find({email,password});
    const valid = await bcrypt.compare(password, user.password);
    if(valid){
      const token = jwt.sign({email, admin}, process.env.SECRETKEY);
      const cookieDetails = {
        httpOnly : true,
        secure: true,
        sameSite : "None",
        maxAge : 7*24*60*60*1000
      }
      res.cookie("token", token, cookieDetails);
      res.status(200).json({
        status:true,
        body:"Login Successfull"
      });
    }
    else{
      res.status(409).json({
        status : false,
        body : "Invalid Credentials"
      })
    }
  }
  catch(err){
    res.status(500).json({
      status:false,
      body:`Error : ${err}`
    }) 
  }
}


const signout = async (req, res)=>{
  try{
   res.clearCookie("token");
   res.status(200).json({
    status : true,
    body: "Log Out Successfull"
   })
  } 
  catch(err){
    res.status(400).json({
      status : false,
      body : "Unable To Logout"
    })
  }
}

const checkAuth = async (req, res)=>{
  const {token} = req.cookies;
  if(!token){
    res.status(200).json({
      status : false,
      body : "Not Authorized"
    })
  }
  else{
    try{
      const decoded = jwt.verify(token, process.env.SECRETKEY);
      res.status(200).json({
        status:true,
        body : "Already LoggedIn"
      })
    }
    catch(err){
      res.status(500).json({
        status:false,
        body:`Error : ${err}`
      })
    }
  }
}

module.exports = {signin, signup, signout, checkAuth};