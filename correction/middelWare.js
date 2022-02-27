// import express JS module into app 
// and creates its variable. 
var express = require('express');
const { stringify } = require('querystring');
var app = express();
const Websocket = require('ws');
app.use(express.json());
const wss = new Websocket.Server({ port: 8081 });

/*app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req.testing);
});*/

// Creates a server which runs on port 3000 and  
// can be accessed through localhost:3000 
app.listen(3000, function() { 
    console.log('server running on port 3000'); 
} ) 

//recupere les chansons et la question pose
JsonString = {}

/*app.ws('/', function(ws, req) {
  jsondata = JSON.stringify(JsonString)
  dataobject = JSON.parse(jsondata)
  ws.send(jsondata);
});*/

wss.on('connection', (ws) => {
  ws.on("message", msg => {
    console.log(msg.toString());
    //ws.send(`msg is = ${msg}`);
  });
})

app.post('/plugindata', GetData);

function GetData(req, res){
  jsondata = JSON.stringify(req.body);
  JsonString = JSON.parse(jsondata);
  res.send("POST Request Called");
}

app.post('/correction', callCorrection); 
  
function callCorrection(req, res) { 
  console.log(req.body);
  jsondata = JSON.stringify(req.body);
  result = JSON.parse(jsondata);
  var spawn = require("child_process").spawn; 
    
  var process = spawn('python',["./correction.py", 
                                  result.question, 
                                  result.correction] ); 
  process.stdout.on('data', function(data) { 
      res.send(data.toString()); 
  } )
  
  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

} 