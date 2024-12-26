const router=require('express').Router()
const { signup, getdataFromdatabase } = require('../Controller/usercontroller')
const user=require('../model/userSchema')
const verifyToken = require('../verifyToken')

router.post('/postData',signup)

router.get('/getData',getdataFromdatabase)

router.get('/getSingleData/:id',verifyToken,async(req,res)=>{
    console.log("after verify token");
    
try{
const singleData=await user.findById(req.params.id)
res.status(200).json(singleData)
}catch(err){
res.status(500).json(err)
}
})

router.get('/getsingleDataAtQuery',async(req,res)=>{
    console.log(req.query);
    
    try{
const singleData=await user.findOne({Email:req.query.email})
res.status(200).json(singleData)
    }catch(err){
res.status(500).json(err.message)
    }
})

router.put('/updateDataBase/:id',verifyToken,async(req,res)=>{
try{
await user.findByIdAndUpdate(req.params.id,{$set:{Email:req.body.email,Mobile:req.body.mobile,Firstname:req.body.name,Password:req.body.password}},{new:true})
res.status(200).json("update success")
}catch(err){
res.status(500).json(err.message)
}
})

router.put('/updateDataBaseByFindelement',async(req,res)=>{
try{
    console.log(req.query);
    console.log(req.body);
    
    
const updateDatabase=await user.findOneAndUpdate({Email:req.query.email},{$set:{Email:req.body.email,Mobile:req.body.mobile,Firstname:req.body.Firstname,Password:req.body.Password}},{new:true})
res.status(200).json(updateDatabase)
}catch(err){
res.status(500).json(err.message)
}
})

router.delete('/deleteDatabase/:id',verifyToken,async (req,res)=>{
    try{
await user.findByIdAndDelete(req.params.id)
res.status(200).json({message:"Your account is deleted"})
    }catch(err){
res.status(500).json(err.message)
    }
})
router.delete('/deleteDatabaseone',async (req,res)=>{
    
    try{
await user.findOneAndDelete({Mobile:req.query.mobile})
res.status(200).json({message:"Delete data from data base"})
    }catch(err){
res.status(500).json(err.message)
    }
})



 

module.exports=router