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
            body: "User Not Found"
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

const addNote = async (req, res)=>{
  const {token} = req.cookies;
    if(!token){
       return res.status(401).json({
           status : false,
           body : "Not Authorized"
       })
    }
    else{
      try{
       const {email} = jwt.verify(token, process.env.SECRETKEY);
       const user = await userModel.findOne({email});
       if(!user){
        return res.status(404).json({
            status : false,
            body: "User Not Found"
        })
       }
       const {title, content} = req.body;
       const newNote = new notesModel({title, content, user:user._id});
       await newNote.save();
       
       return res.status(200).json({
         status : true,
         body : newNote
       })
      }
      catch(err){
        return res.status(500).json({
         status : false,
         body:`Error : ${err.message}`
       })
      }
    }
}

const editNote = async (req, res)=>{
  const {token} = req.cookies;
  if(!token){
    return res.status(401).json({
      status:false,
      body :"Not Authorized"
    })
  }else{
    try{
      const {email} = jwt.verify(token, process.env.SECRETKEY);
      const user = await userModel.findOne({email});
      if(!user){
        return res.status(404).json({
          status:false,
          body:"User Not Found"
        })
      } 
      const {title, content} = req.body;
      const {noteId} = req.params;
      const note = await notesModel.findById(noteId);
      if(!note){
        return res.status(404).json({
          status:false,
          body:"Note Not Found"
        })
      }
      if(note.user.toString() != user._id.toString()){
        return res.status(403).json({
          status:false,
          body:"Not Authorized"
        })
      }
      const editedNote = await notesModel.findByIdAndUpdate(noteId, {title, content}, {new:true});
      return res.status(200).json({
        status:true,
        body:editedNote
      })
    }
    catch(err){
      return res.status(500).json({
         status : false,
         body:`Error : ${err.message}`
      })
    }
  }
} 

const deleteNote = async (req, res)=>{
  const {token} = req.cookies;
  if(!token){
    return res.status(401).json({
      status: false,
      body: "Not Authorized",
    });
  }
  try{
    const {email} = jwt.verify(token, process.env.SECRETKEY);
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).json({
        status: false,
        body: "User Not Found",
      });
    }

    const {noteId} = req.params;
    const note = await notesModel.findById(noteId);
    if(!note){
      return res.status(404).json({
        status: false,
        body: "Note Not Found",
      });
    }

    if(note.user.toString() != user._id.toString()) {
      return res.status(403).json({
        status: false,
        body: "Not Authorized",
      });
    }

    await note.deleteOne();
    user.notes = user.notes.filter((id)=>{ return id.toString() != noteId.toString()});
    await user.save();
    return res.status(200).json({
      status: true,
      body: "Note Deleted Successfully",
    });
  } 
  catch (err) {
    return res.status(500).json({
      status: false,
      body: `Error : ${err.message}`,
    });
  }
};


const getNote = async (req, res)=>{
 const {token} = req.cookies;
 if(!token){
    return res.status(401).json({
        status : false,
        body : "Not Authorized"
    })
  }
  else{
    try{
      const {email} = jwt.verify(token, process.env.SECRETKEY);
      const user = await userModel.findOne({email})
      if(!user){
        return res.status(404).json({
            status : false,
            body: "User Not Found"
        })
      }
      const {noteId} = req.params;
      const noteInfo = await notesModel.findById(noteId);
       if (!noteInfo) {
          return res.status(404).json({
            status: false,
            body: "Note Not Found"
          });
       }
       if (noteInfo.user.toString() !== user._id.toString()) {
          return res.status(403).json({
            status: false,
            body: "Not Authorized"
          });
       }
        return res.status(200).json({
            status: true,
            body: noteInfo,
        });
    }
    catch(err){
      return res.status(500).json({
         status : false,
         body:`Error : ${err.message}`
      })
    }
  }
 
}

module.exports = { showNotes, editNote, getNote ,deleteNote ,addNote };
