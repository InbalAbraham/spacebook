var express = require('express');
var bodyParser = require('body-parser');

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
});

app.set('port', (process.env.PORT || 3000));

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
});

app.use('/posts', require('./app/routes/post.router'));

// listen for requests
app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
