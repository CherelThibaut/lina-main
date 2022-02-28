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
JsonString = []

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
  JsonString = JSON.stringify(req.body);
  res.send("POST Request Called");
  /*wss.clients.forEach((client) => {
    // Check that connect are open and still alive to avoid socket error
    if (client.readyState === Websocket.OPEN) {
      console.log("hello")
      client.send(JsonString);
    }
  });*/
    wss.clients.forEach((client) => {
      client.send(JsonString)
    });
}

app.post('/correction', callCorrection); 
  
function callCorrection(req, res) {
  jsondata = JSON.stringify(req.body);
  result = JSON.parse(jsondata);
  var spawn = require("child_process").spawn; 
    
  var process = spawn('python',["./correction.py", 
                                  result.question, 
                                  result.correction] ); 
  process.stdout.on('data', function(data) { 
      res.send(data.toString());
      wss.clients.forEach((client) => {
        // Check that connect are open and still alive to avoid socket error
        if (client.readyState === Websocket.OPEN) {
          console.log(JsonString)
          client.send(JSON.stringify(JsonString));
        }
      });
  } )
  
  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

} 