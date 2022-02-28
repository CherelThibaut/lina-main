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
JsonString = [{ 'track' : [{ 'name' : 'Il lago', 'song' : 'https://p.scdn.co/mp3-preview/c4a9dd0d7877c92696fed1ffe54218b79d7fda53?cid=d36e56f267a34540b2a1d973ac1edc93' },{ 'name' : 'Abbellimenti', 'song' : 'https://p.scdn.co/mp3-preview/cddba6146c0696b8d03b5c0a30ca6398554ad667?cid=d36e56f267a34540b2a1d973ac1edc93' },{ 'name' : 'Luna piena', 'song' : 'https://p.scdn.co/mp3-preview/d1a1b5525c9f079279bebe6f0c827a41d6cde60b?cid=d36e56f267a34540b2a1d973ac1edc93' }],"question": "joue de la musique d'enzo"}]

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
  wss.clients.forEach((client) => {
    // Check that connect are open and still alive to avoid socket error
    if (client.readyState === Websocket.OPEN) {
      console.log(JsonString)
      client.send(JsonString);
    }
  })
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
          client.send(JsonString);
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