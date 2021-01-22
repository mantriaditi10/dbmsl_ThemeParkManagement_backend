var express = require('express');
var router = express.Router();


const Users = require('../models/Users');
const app = require('../app');

const userRouter = express.Router()




userRouter.route('/')
.get((req,res,next)=>{
    Users.find()
    .then(users=>{
        console.log(users)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json')
        res.json(users)
    })
    .catch(err=>next(err))
});

userRouter.route('/signin')
.post((req,res,next)=>{
    console.log("req.body",req.body)
    newuser = new Users({
      name:{
        fname:req.body.fname,
        lname:req.body.lname
      },
      address:{
        city:req.body.city,
        state:req.body.state,
        country:req.body.country
      },
      emailId:req.body.email,
      password:req.body.password,
      mobileNo:req.body.mobileNo
    })

    Users.findOne({emailId:req.body.email})
    .then(user=>{
      console.log(user)
        if(user===null){
          console.log("not present")
          Users.create(newuser)
          .then(user=>{
              console.log(user)
              res.statusCode=200
              res.setHeader('Content-Type', 'application/json')
              res.json({user:user,success:true})
          })
          .catch(err=>next(err))
        }
        else{
          console.log("present")
          res.json({err:"User already present!!",success:false})
        }
    })
    .catch(err=>{next(err)})

    
})

userRouter.route('/login')
.post((req,res,next)=>{
    console.log("req.body",req.body)
    
    Users.findOne({emailId:req.body.email,password:req.body.password})
    .then(user=>{
      console.log(user)
        if(user){
            console.log("present")
            console.log(user)
            res.statusCode=200
            res.setHeader('Content-Type', 'application/json')
            res.json({user:user,success:true})
        }
         
        else{
            console.log("not present")
            res.json({err:"emailid or password is wrong!!",success:false})
        }
    })
    .catch(err=>{next(err)})

    
})

module.exports = userRouter;
