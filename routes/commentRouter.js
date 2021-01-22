const express = require('express');

const Comments = require('../models/Comments')

const commentRouter = express.Router()

commentRouter.route('/')
.get((req,res,next)=>{
    Comments.find()
    .populate('userId')
    .then(comments=>{
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json');
        res.json(comments)
    })
    .catch(err=>next(err))
})

.post((req,res,next)=>{
    console.log(req.body)
    Comments.create(req.body)
    .then(comment=>{
        console.log(comment)
        res.statusCode=200
        res.setHeader('Content-Type', 'application/json');
        res.json(comment)
    })
    .catch(err=>next(err))
})

module.exports = commentRouter