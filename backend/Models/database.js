const mongoose = require('mongoose');
require('dotenv').config();


async function setDbConnection(){
  try{
      await mongoose.connect(process.env.MONGODBURL);
  }
  catch(err){
      console.log(err);
  }
}


module.exports = setDbConnection;
