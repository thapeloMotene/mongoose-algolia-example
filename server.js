

var express = require('express');
var mongoose = require('mongoose');
var bodyParser= require('body-parser');
var morgan = require('morgan')
var bookRoutes = require('./routes/book.route');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/mongooliaDemo', function(err){
    if (!err){
        console.log('Successfully connected to the database');
    }else{
        console.log('Failed to connect to the database');
    }
});
app.use(morgan("dev"));

app.use(bookRoutes);

app.listen(3000, function(){
    console.log('app running on port 3000');
});



