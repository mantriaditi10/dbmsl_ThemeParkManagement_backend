var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var pdf = require("pdf-creator-node");
var fs = require('fs');
const Tickets =require('./models/Tickets')
 
// Read HTML Template
var html = fs.readFileSync('template.html', 'utf8');

var options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
      height: "45mm"
  },
  "footer": {
      "height": "28mm",
      "contents": {
      first: 'Cover page',
      2: 'Second page', // Any page number is working. 1-based index
      default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: 'Last Page'
  }
}
}



const url = config.mongoURL;
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true });

const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log("connected to moongose"))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rideRouter  = require('./routes/rideRouter');
var restaurantRouter = require('./routes/restaurantRouter');
var dishRouter = require('./routes/dishRouter')
var ticketRouter = require('./routes/ticketRouter')
var commentRouter = require('./routes/commentRouter')

var app = express();

app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Rides',rideRouter);
app.use('/Restaurants',restaurantRouter);
app.use('/Dishes',dishRouter);
app.use('/tickets',ticketRouter);
app.use('/comments',commentRouter);

app.get('/bookedticket/:id',(req,res)=>{
  Tickets.findOne({userId:req.params.id})
  .populate('userId')
  .then((ticket)=>{
    if(ticket){
      var document={
        html:html,
        data:{
          name:{
            fname:ticket.userId.name.fname,
            lname:ticket.userId.name.lname
          },
          id:ticket._id,
          noOfPeople:{
            adults:ticket.noOfPeople.adults,
            children:ticket.noOfPeople.children
          },
          dateOfVisit:ticket.dateOfVisit,
          amount:ticket.amount,
          ticketType:ticket.ticketType
        },
        path:`./documents/${req.params.id}.pdf`

      }
      pdf.create(document, options)
      .then(doc => {
        console.log(doc)
      })
      .catch(err => {
          next(err)
      });
    }
    
  })
  .then(()=>{
    res.statusCode=200
    res.sendFile(`${__dirname}/documents/${req.params.id}.pdf`)
  })
  .catch(err=>next(err))
  
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
