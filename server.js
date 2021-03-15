var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer();


// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

var survye_route = require('./routes/SurveyRoute')

app.use('/simplesurvey',survye_route)

var server = app.listen(8001, 'localhost', () =>{
    console.log('Server is listening')
});

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB =  require('./config/DbConfig')
mongoose.connect(mongoDB.url, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = app