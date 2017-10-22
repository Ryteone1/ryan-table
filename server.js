var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var command = process.argv[2];
var input = process.argv[3];
const unusedFilename = require('unused-filename');
var search = input;
var responseData = [ ];
var responseAttrs = [ ];
var file = [ ];
var fileToWrite = "page.html";
file.push(fileToWrite);
// toDo auto increment fileName with (1), (2), (3) etc.
// var nameFiles = function() { 
//     unusedFilename(fileToWrite).then(fileName => {
//       file.push(fileName);
//     console.log(fileName);
//     //=> 'rainbow (2).txt' 
// });
//   }
if(command === "scrape"){
if(!input){
  search = 'https://siteurl.com/that/leads/us/to-the-api.json_or.html';
}
    var writeJSONspecificAttrs = function(){
    fs.writeFile(
                  "attrs.json",
                  JSON.stringify(responseAttrs),
                  "utf-8",
                  function(err) {
                    if (err) throw err;  
                  }
                );
  }
    var writeJSON = function(){
    fs.writeFile(
                  "api.json",
                  responseData,
                  "utf-8",
                  function(err) {
                    if (err) throw err;  
                  }
                );    
  }
    var writeHTML = function(){
      fs.writeFile(
                  "page.html",
                  responseData,
                  "utf-8",
                  function(err) {
                    if (err) throw err;  
                  }
                );
    }
      var xLength = [ ];
    var writeX = function(){
      fs.writeFile(
                  "xLength.json",
                  xLength,
                  "utf-8",
                  function(err) {
                    if (err) throw err;  
                  }
                );
    }    
// setTimeout functions are here allowing our methods enough time to fetch and return data. 
setTimeout(writeJSON, 800);
setTimeout(writeHTML, 1800);
setTimeout(writeJSONspecificAttrs, 900);
setTimeout(writeX, 900);
// setTimeout(nameFiles, 900)
request(search, function (error, response, data) {
  // ship the data to our responseData variable
  responseData.push(data);
  // start cheerio DOM, and get ready to manipulate elements/attributes in the response
  var $ = cheerio.load(data);
  // var pLength = [ ]; // goes along with the loop theory for later use toDo
  var responseScope = $('body').map(function(index, element) {
    // toDo loop through Paragraphs, and fetch separately.
    // p = responseScope.p;
    // for(i=0;i<p.length;i++) {
    //   pLength.push(p[i]);
    //   console.log(pLength);
    // }
        return {
            body: $(element).find('body').text(),
            p: $(element).find('p').text(),
            link: $(element).find('a').attr('href'),
            img: $(element).find('img').attr('src'),
            // image_full: [ ],
        };
    }).get();
    ;
      px = responseData;
    for(i=0;i<px.length;i++) {
      xLength.push(px[i]);
      writeX();
      console.log(xLength);
    }
    //
    //
    // push our responseAttrs the raw JSON data received from responseScope
    responseAttrs.push(responseScope);
    writeJSON();
    writeHTML();
    writeJSONspecificAttrs();
      // nameFiles();
    console.log("responseScope: ");
    console.log(responseScope);
    console.log("\n");
    console.log("Data: ");
    console.log(data);
    // these are here if we need to parse, or send to a string. optional.
    // var strproductAttrs = JSON.stringify(productAttrs);
    // var jsproductAttrs = JSON.parse(strproductAttrs);
    // console.log(jsproductAttrs);
});
}
if(command === "serve"){
var PORT = process.env.PORT || 3000;
// placeholders for app.use boilerplate
//
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set a basic table reservation
var waitList = [ ];
var posts = [ ];
//
var tables = [{
    "name": "Mark",
    "email": "president@worldvaporexpo.com",
    "id": "MarkE",
    "phone": "844-827-3222"
},
{
  "name": "Ryan",
    "email": "rynlacy@yahoo.com",
    "id": "rlacy",
    "phone": "844-827-3222"
}];
fs.readFile("./xLength.json", "utf-8", function(err, data) {
                if (err) throw err;
                var arrayOfObjects = JSON.parse(data);
                posts.push(arrayOfObjects);
});
//
// Set get root route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});
//
app.get('/scrape', function(req, res) {
    res.sendFile(path.join(__dirname, fileToWrite));
});
//
app.get('/home', function(req, res) {
   res.sendFile(path.join(__dirname, "home.html"));
});
//
app.get('/reserve', function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});
//
app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
//
app.get('/posts', function(req, res) {
    res.sendFile(path.join(__dirname, "posts.html"));
});
//
app.get('/wait-list', function(req, res) {
    res.send("<h1>Wait List</h1>" + "\n" + "<h2>Wait List</h2>");
});
//
app.get('/api/tables', function(req, res) {
   res.json(tables);
});
//
app.get('/api/posts', function(req, res) {
   res.json(posts);
});
//
app.get('/api/wait-list', function(req, res) {
    res.json(waitList);
});
//
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
//
app.listen(PORT, function() {
    console.log("Listening on port %s", PORT);
});
}