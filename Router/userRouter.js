const router=require('express').Router()
const { signup, getdataFromdatabase } = require('../Controller/usercontroller')
const user=require('../model/userSchema')

router.post('/postData',signup)

router.get('/getData',getdataFromdatabase)

router.get('/getSingleData/:id',async(req,res)=>{
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

router.put('/updateDataBase/:id',async(req,res)=>{
try{
const updateDatabase=await user.findByIdAndUpdate(req.params.id,{$set:{Email:req.body.email,Mobile:req.body.mobile,Firstname:req.body.Firstname,Password:req.body.Password}},{new:true})
res.status(200).json(updateDatabase)
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

router.delete('/deleteDatabase/:id',async (req,res)=>{
    try{
await user.findByIdAndDelete(req.params.id)
res.status(200).json({message:"Delete data from data base"})
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