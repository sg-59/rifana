const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
app.use(cors())
dotenv.config()

const routerpage=require('./Router/userRouter')
const loginrouterpage=require('./Router/loginRouter')

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("data base are connected");
    
}).catch((err)=>{
    console.log(err.message);
    
})

app.use(express.json())

app.use('/api',routerpage)
app.use('/log',loginrouterpage)

app.listen(3000,()=>{
    console.log("port is connected");
    
})

// http://localhost:3000/api