const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Rides = require('../models/Rides');

const rideRouter = express.Router()


rideRouter.route('/')
.get((req,res,next)=>{
    Rides.find()
    .then((rides)=>{
        // console.log(rides)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rides);
    })
    .catch(err=>{
        next(err)
    })
})

.post((req,res,next)=>{
    Rides.create(req.body)
    .then(ride=>{
        console.log("ride created",ride)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ride);
    })
    .catch(err=>{
        next(err)
    })
})

rideRouter.route('/featured')
.get((req,res,next)=>{
    Rides.find({featured:true})
    .then((rides)=>{
        // console.log(rides)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rides);
    })
    .catch(err=>{
        next(err)
    })
})

module.exports=rideRouter;