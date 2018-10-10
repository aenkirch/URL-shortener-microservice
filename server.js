'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

const bodyParser = require('body-parser');

const schema = new mongoose.Schema({
  long: {type: String, required: true},
  short: {type: String, required: true}
})

var URL = mongoose.model("URL", schema);

app.use(bodyParser.json());

app.route('/api/shorturl/new')

  .post( (req, res) => {
    let paramURL = req.body.url;

    res.json(paramURL);
  
    URL.count({}, (err, data) => {
              if (err) { res.send("error"); }

              let url = new URL(
                {
                  long: paramURL,
                  short: data
                }
              );
      
              res.json(url);
    });
});


app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});