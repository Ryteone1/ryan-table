var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var path = require('path');

var PORT = process.env.PORT || 3000;

// placeholders for app.use boilerplate
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set a basic table reservation
var tables = [{
    "name": "Mark",
    "email": "president@worldvaporexpo.com",
    "id": "MarkE",
    "phone": "844-827-3222"
}];

var waitList = [];

// Set get root route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get('/home', function(req, res) {
   res.sendFile(path.join(__dirname, "home.html"));
});

app.get('/reserve', function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get('/wait-list', function(req, res) {
    res.send("<h1>Wait List</h1>");
});

app.get('/api/tables', function(req, res) {
   res.json(tables);
});

app.get('/api/wait-list', function(req, res) {
    res.json(waitList);
});

app.post('/api/reserve', function(req, res) {
   var newReservation = req.body;
   if (tables.length < 5) {
       tables.push(newReservation);
       res.redirect("/tables");
   } else {
       waitList.push(newReservation);
       res.redirect("/wait-list");
   }
});

app.listen(PORT, function() {
    console.log("Listening on port %s", PORT);
});