'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var cors = require('cors');
var validUrl = require('valid-url');

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
const bodyParser = require('body-parser');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const schema = new mongoose.Schema({
  long: {type: String, required: true},
  short: {type: String, required: true}
})

var URL = mongoose.model("URL", schema);

app.get('/api/shorturl/:param', (req, res) => {
  var paramRecherche = req.params;
  
  if ( Number.isInteger( parseInt(paramRecherche) ) ){
    URL.find({short: parseInt(paramRecherche)}, (err, data) => {
      if (err) {res.json("not refering to a URL in db")}
      res.json(data);
    });
  }
});

app.route('/api/shorturl/new')

  .post( (req, res) => {
    var paramURL = req.body.url;
  
    //gérer un URL invalide
    if (!isValid(paramURL)) { res.json({ "error": "invalid URL" }) }

    //gérer un objet déjà présent en base
    URL.find({long: paramURL}, (err, data) => {
      if (err) {console.log("nouvel objet")}
      res.json(data);
    });
    
    //création de nouvel objet
    URL.count({}, (err, data) => {
              if (err) { res.send("error"); }

              let url = new URL(
                {
                  long: paramURL,
                  short: data
                }
              );
      
              url.save( (err, data) => {
                if (err) { res.send("error when creating object"); }
              });
      
              res.json(url);
    });
});

function isValid (url) {
  if (!validUrl.isUri(url))
    return false;
  return true;
};

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