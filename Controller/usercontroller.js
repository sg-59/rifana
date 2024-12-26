const argon2 = require('argon2');
const jwt=require('jsonwebtoken')
const user=require('../model/userSchema')

const signup=async(request,response)=>{
     console.log("react data in backend",request.body);
     
    try{   
        const hashedPassword=await argon2.hash(request.body.password)

        console.log(request.body);
        await  user.create({Firstname:request.body.name,Email:request.body.email,Mobile:request.body.mobile,Password:hashedPassword})
      return  response.send({message:"success"})
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
     console.log("req.body............",req.body);
     
try{
const findUser=await user.findOne({Email:req.body.email})


if(!findUser){
return res.status(400).json("email is not found")
}

if (await argon2.verify(findUser.Password, req.body.password)) {
     const token=jwt.sign({id:findUser._id},process.env.jwtSecretKey,{expiresIn:"1d"})
  return res.status(200).json({message:"login success",token,userId:findUser._id})
  } else {
   return res.status(400).json("email and password is not match")
  }


}catch(err){
return res.status(500).json(err.message)
}
}

module.exports={signup,getdataFromdatabase,loginInfo}