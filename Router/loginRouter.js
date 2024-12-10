const { loginInfo } = require('../Controller/usercontroller')

const router=require('express').Router()

router.post('/login',loginInfo)


module.exports=router