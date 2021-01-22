const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/Dishes')

const dishRouter = express.Router();

dishRouter.route('/')
.get((req,res,next)=>{
    Dishes.find()
    .then(dishes=>{
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes)
    }) 
    .catch(err=>next(err))
})

.post((req,res,next)=>{
    Dishes.create(req.body)
    .then(dish=>{
        console.log(dish)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json');
        res.json(dish)
    })
    .catch(err=>next(err))
})

module.exports=dishRouter;