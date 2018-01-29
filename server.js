var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config.js');

// create express app
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})


app.get('/', function(req, res){
    res.json({"message": "Welcome to spacebook application. enjoy!"});
});

app.use('/posts', require('./app/routes/post.router'));

// listen for requests
app.listen(config.serverPost, function(){
    console.log("Server is listening on port " + config.serverPort);
});
