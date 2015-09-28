var express = require('express');
var app = express();
var democrats = require('./public/assets/data/democrats.json');
var republicans = require('./public/assets/data/republicans.json');

app.use(express.static(__dirname+"/public"));


app.get('/',function(req,res) {
    res.sendFile(__dirname+"/public/views/index.html");
});

app.get('/rep',function(req,res) {
    //console.log("REPS");
    res.send(JSON.stringify(republicans));
});

app.get('/dem',function(req,res) {
    //console.log("DEMS");
    res.send(JSON.stringify(democrats));
});

var server = app.listen(3000,function() {
    console.log("Listening on port: ",server.address().port);
});


module.exports = app;