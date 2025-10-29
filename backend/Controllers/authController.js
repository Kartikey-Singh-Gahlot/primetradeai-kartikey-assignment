const signin = async (req, res)=>{
  const {email, password} = req.body;
  try{
    
  }
  catch(err){

  }
  res.send("signin");
}

const signup = (req, res)=>{
   const {name, email} = req.body;
   try{

   }
   catch(err){
    
   }
    res.send("signup");
}


module.exports = {signin, signup};