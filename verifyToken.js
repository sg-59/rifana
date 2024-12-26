const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
console.log("verify token",req.params.id);
console.log("token value",req.headers.token);
const token=req.headers.token
if(token){
    jwt.verify(token,process.env.jwtSecretKey,(err,data)=>{
        if(err)  return res.status(400).json("your token is not valid")

            console.log("final out put jason web token",data);
            if(data.id==req.params.id){
                next()
            }else{
                return res.status(400).json("your id and token id are missmatched") 
            }
            
           
    })
  
}else{
    return res.status(400).json("token not found")
}


}

module.exports=verifyToken