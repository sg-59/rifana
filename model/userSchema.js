const mongoose=require('mongoose')

const userInfo=new mongoose.Schema({
    Firstname:{type:String,required:true},
    Email:{type:String,required:true,unique:true},
    Mobile:{type:Number,required:true,unique:true},
    Password:{type:String,required:true},
    image:{type:String}
})

module.exports=mongoose.model('rifanacollection',userInfo)