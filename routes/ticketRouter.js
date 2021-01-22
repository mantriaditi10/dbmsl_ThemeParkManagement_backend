const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Tickets = require('../models/Tickets')

const ticketRouter = express.Router()

ticketRouter.route('/')
.get((req,res,next)=>{
    Tickets.find()
    .populate('userId')
    .then(tickets=>{
        console.log(tickets)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json');
        res.json(tickets)
    })
})

.post((req,res,next)=>{
    console.log(req.body)
    ticket = new Tickets({
        noOfPeople:{
            adults:req.body.adults,
            children:req.body.children
            
        },
        userId:req.body.userId,
        ticketType:req.body.ticketType,
        dateOfVisit:req.body.dateOfVisit,
        amount:req.body.amount
    })
    Tickets.create(ticket)
    .then(ticket=>{
        console.log(ticket)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json');
        res.json(ticket)
    })
    .catch(err=>next(err))
})


ticketRouter.route('/:id')
.get((req,res,next)=>{
    console.log(req.params.id)
    Tickets.findOne({userId:req.params.id})
    .populate('userId')
    .then(ticket=>{
        if(ticket){
            console.log(ticket)
            res.statusCode=200
            res.setHeader('Content-Type', 'application/json');
            res.json({ticket:ticket,success:true})
        }
        else{
            res.statusCode=200
            res.setHeader('Content-Type', 'application/json');
            res.json({err:"No booked Ticket Available!!",success:false})
        }
        
    })
    .catch(err=>next(err))
})

module.exports = ticketRouter
