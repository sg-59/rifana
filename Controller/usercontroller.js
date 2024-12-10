const argon2 = require('argon2');
const user=require('../model/userSchema')

const signup=async(request,response)=>{
    try{   
        const hashedPassword=await argon2.hash(request.body.password)
        console.log(request.body);
        await  user.create({Firstname:request.body.name,Email:request.body.email,Mobile:request.body.mobile,Password:hashedPassword})
      return  response.send("Data stored in data base ")
           }catch(err){
      return  response.send(err.message)
           } 
}

const getdataFromdatabase=async(req,res)=>{
    try{
        const Databasevalue=await user.find()
       return res.status(200).json(Databasevalue)
            }catch(err){
       return res.status(500).json(err.message)
            }
}

const loginInfo=async(req,res)=>{
try{
const findUser=await user.findOne({Email:req.body.email})


if(!findUser){
return res.status(400).json("email is not found")
}

if (await argon2.verify(findUser.Password, req.body.password)) {
  return res.status(200).json("login success")
  } else {
   return res.status(400).json("email and password is not match")
  }


}catch(err){
return res.status(500).json(err.message)
}
}

module.exports={signup,getdataFromdatabase,loginInfo}