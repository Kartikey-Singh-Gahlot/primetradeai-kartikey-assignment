const userModel = require('../Models/userModel.js');
const notesModel = require('../Models/notesModel.js');
const jwt = require('jsonwebtoken');
const  mongoose  = require('mongoose');
require('dotenv').config();


const showNotes = async (req, res)=>{
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
       const user = await userModel.findOne({email});
       if(!user){
        return res.status(404).json({
            status : false,
            body: "User not found"
        })
       }

       const userNotes = await notesModel.find({user:user._id});

       return res.status(200).json({
         status : true,
         body : userNotes
       })
     }
     catch(err){
       res.status(500).json({
         status : false,
         body:`Error : ${err.message}`
       })
     }
  }
}

const editNote = async (req, res)=>{
 try{

  }
  catch(err){
    
  }
} 

const deleteNote = async (req, res)=>{
 try{

  }
  catch(err){
    
  }
}

const getNote = async (req, res)=>{
 try{

  }
  catch(err){
    
  }
}

module.exports = { showNotes, editNote, getNote ,deleteNote };
