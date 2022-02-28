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
JsonString = [{"track":[{"name":"R9R-LINE (feat. Damso)","song":"https://p.scdn.co/mp3-preview/18385cc2d8456867fb97244a1ea723ded6330775?cid=d36e56f267a34540b2a1d973ac1edc93"},{"name":"God Bless (feat. Damso)","song":"https://p.scdn.co/mp3-preview/35453a45bdf8b2ab0a2ca9a5acc2f79a9c187eaa?cid=d36e56f267a34540b2a1d973ac1edc93"},{"name":"R�ves bizarres (feat. Damso)","song":"https://p.scdn.co/mp3-preview/8ca70b6d5869fd1edd139eb63ed0a38c55aa0a20?cid=d36e56f267a34540b2a1d973ac1edc93"}],"question":"joue de la musique damso"}]

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
  //JsonString = JSON.stringify(req.body);
  res.send("POST Request Called");
  /*wss.clients.forEach((client) => {
    // Check that connect are open and still alive to avoid socket error
    if (client.readyState === Websocket.OPEN) {
      console.log("hello")
      client.send(JsonString);
    }
  });*/
    wss.clients.forEach((client) => {
      console.log(JsonString);
      client.send(JSON.stringify(JsonString));
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
  } )
  
  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

} 