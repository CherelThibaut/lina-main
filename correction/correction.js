// import express JS module into app 
// and creates its variable. 
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);


// Creates a server which runs on port 3000 and  
// can be accessed through localhost:3000 
app.listen(3000, function() { 
    console.log('server running on port 3000'); 
} ) 

/*app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req.testing);
  });
*/
const data = {
  name:"test",
  message:"this is a message",
  song:"https://p.scdn.co/mp3-preview/d69227aeef6ec7f07f446f592f2d1bb5bed2dd12?cid=d36e56f267a34540b2a1d973ac1edc93"
}

jsondata = JSON.stringify(data)
dataobject = JSON.parse(jsondata)

app.ws('/', function(ws, req) {
  console.log(jsondata);
  ws.send(jsondata);
  console.log('socket', req.testing);
});

app.get('/plugindata', GetData);

function GetData(data){
  jsondata = JSON.stringify(data)
  response = JSON.parse(jsondata);
  console.log(response.song);
}
// Function callName() is executed whenever
// url is of the form localhost:3000/name 
app.get('/correction', callCorrection); 
  
function callCorrection(req, res) { 
      
    // Use child_process.spawn method from  
    // child_process module and assign it 
    // to variable spawn 
    var spawn = require("child_process").spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',["./correction.py", 
                            req.query.firstname, 
                            req.query.lastname] ); 
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } ) 
} 