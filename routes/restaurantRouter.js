const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Restaurants = require('../models/Restaurants')

const restaurantRouter = express.Router();

restaurantRouter.route('/')
.get((req,res,next)=>{
    Restaurants.find()
    .then(restaurants=>{
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurants)
    }) 
    .catch(err=>next(err))
})

.post((req,res,next)=>{
    Restaurants.create(req.body)
    .then(restaurant=>{
        console.log(restaurant)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurant)
    })
    .catch(err=>next(err))
})

.put((req,res,next)=>{
    Restaurants.findOneAndUpdate({_id:req.body.id},{
        $set:{table:{total:req.body.total,booked:req.body.booked}}
    },{new:true})
    .then(restaurant=>{
        console.log(restaurant)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurant)
    })
    .catch(err=>next(err))
})

restaurantRouter.route('/featured')
.get((req,res,next)=>{
    Restaurants.find({featured:true})
    .then(restaurants=>{
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurants)
    }) 
    .catch(err=>next(err))
})

module.exports=restaurantRouter;