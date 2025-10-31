const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const notesModel = require('../Models/notesModel');
require('dotenv').config();


const signup = async (req, res)=>{
   const {name, email, password, adminKey } = req.body;
   const admin = ((adminKey) && (adminKey==process.env.ADMINKEY))? true:false;
   try{
     const salt = await bcrypt.genSalt();
     const hashedPassword = await bcrypt.hash(password,salt);
     const user = new userModel({name, email, password:hashedPassword, admin })
     const welcomeNote = new notesModel({
       title : `Welcome ${name}`,
       content: `This is The Notes Keeper !, We're happy to get you onboard. Here you can create and store all of your notes`,
       user : user._id
     })
     await welcomeNote.save();
     user.notes.push(welcomeNote._id);
     await user.save();

    
     const token = jwt.sign({email, admin}, process.env.SECRETKEY);
     const cookieDetails = {
       httpOnly : true,
       secure: true,
       sameSite : "None",
       maxAge : 7*24*60*60*1000
     }
     res.cookie("token",token, cookieDetails);
     return res.status(201).json({
      status : true,
      body : "SignUp Successfull"
     })
   }
   catch(err){
     return res.status(500).json({
      status : false,
      body : `Error : ${err.message}`
     })
   }
}

const signin = async (req, res)=>{
  const {email, password} = req.body;
  try{
    const user = await userModel.findOne({email});
    const valid = await bcrypt.compare(password, user.password);
    if(valid){
      const token = jwt.sign({email:user.email, admin:user.admin}, process.env.SECRETKEY);
      const cookieDetails = {
        httpOnly : true,
        secure: true,
        sameSite : "None",
        maxAge : 7*24*60*60*1000
      }
      res.cookie("token", token, cookieDetails);
      return res.status(200).json({
        status:true,
        body:"Login Successfull"
      });
    }
    else{
      return res.status(401).json({
        status : false,
        body : "Invalid Credentials"
      })
    }
  }
  catch(err){
    return res.status(500).json({
      status:false,
      body:`Error : ${err.message}`
    }) 
  }
}


const signout = async (req, res)=>{
  try{
   res.clearCookie("token");
   return res.status(200).json({
    status : true,
    body: "Log Out Successfull"
   })
  } 
  catch(err){
    return res.status(400).json({
      status : false,
      body : "Unable To Logout"
    })
  }
}

const checkAuth = async (req, res)=>{
  const {token} = req.cookies;
  if(!token){
    return res.status(401).json({
      status : false,
      body : "Not Authorized"
    })
  }
  else{
    try{
      const {email, admin} = jwt.verify(token, process.env.SECRETKEY);
      return res.status(200).json({
        status:true,
        body : "Already LoggedIn",
        adminStatus : admin
      })
    }
    catch(err){
      return res.status(500).json({
        status:false,
        body:`Error : ${err.message}`
      })
    }
  }
}



module.exports = {signin, signup, signout, checkAuth};